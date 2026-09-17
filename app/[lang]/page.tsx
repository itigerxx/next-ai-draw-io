"use client"
import { usePathname, useRouter } from "next/navigation"
import { Suspense, useCallback, useEffect, useRef, useState } from "react"
import { DrawIoEmbed } from "react-drawio"
import type { ImperativePanelHandle } from "react-resizable-panels"
import ChatPanel from "@/components/chat-panel"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useDiagram } from "@/contexts/diagram-context"
import { type DrawioTheme, isDrawioTheme } from "@/lib/drawio-themes"
import { i18n, type Locale } from "@/lib/i18n/config"

export default function Home() {
    const {
        drawioRef,
        handleDiagramExport,
        handleDiagramAutoSave,
        onDrawioLoad,
        resetDrawioReady,
    } = useDiagram()
    const router = useRouter()
    const pathname = usePathname()
    // Extract current language from pathname (e.g., "/zh/about" → "zh")
    const currentLang = (pathname.split("/")[1] || i18n.defaultLocale) as Locale
    const [isMobile, setIsMobile] = useState(false)
    const [isChatVisible, setIsChatVisible] = useState(true)
    const [drawioUi, setDrawioUi] = useState<DrawioTheme>("kennedy")
    const [darkMode, setDarkMode] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isDrawioReady, setIsDrawioReady] = useState(false)
    const [isElectron, setIsElectron] = useState(false)
    const [drawioBaseUrl, setDrawioBaseUrl] = useState(
        process.env.NEXT_PUBLIC_DRAWIO_BASE_URL || "https://embed.diagrams.net",
    )

    const chatPanelRef = useRef<ImperativePanelHandle>(null)
    const isMobileRef = useRef(false)

    // Load preferences from localStorage after mount
    useEffect(() => {
        // Restore saved locale and redirect if needed
        const savedLocale = localStorage.getItem("next-ai-draw-io-locale")
        if (savedLocale && i18n.locales.includes(savedLocale as Locale)) {
            const pathParts = pathname.split("/").filter(Boolean)
            const currentLocale = pathParts[0]
            if (currentLocale !== savedLocale) {
                pathParts[0] = savedLocale
                router.replace(`/${pathParts.join("/")}`)
                return // Wait for redirect
            }
        }

        const savedUi = localStorage.getItem("drawio-theme")
        if (isDrawioTheme(savedUi)) {
            setDrawioUi(savedUi)
        }

        const savedDarkMode = localStorage.getItem("next-ai-draw-io-dark-mode")
        if (savedDarkMode !== null) {
            const isDark = savedDarkMode === "true"
            setDarkMode(isDark)
            document.documentElement.classList.toggle("dark", isDark)
        } else {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)",
            ).matches
            setDarkMode(prefersDark)
            document.documentElement.classList.toggle("dark", prefersDark)
        }

        // Detect Electron and use bundled draw.io files for offline use
        // Note: react-drawio uses `new URL(baseUrl)` so we need absolute URL
        // Include /index.html because Next.js doesn't auto-serve index.html for directories

        // const electronDetected =
        //     !process.env.NEXT_PUBLIC_DRAWIO_BASE_URL &&
        //     !!(window as unknown as { electronAPI?: unknown }).electronAPI
        // if (electronDetected) {
        //     setIsElectron(true)
        //     setDrawioBaseUrl(`${window.location.origin}/drawio/index.html`)
        // }

        // 需要同时满足：① 没有设置自定义外网 URL 环境变量；② 全局对象中包含 Electron 注入的 API
        const electronDetected =
            !process.env.NEXT_PUBLIC_DRAWIO_BASE_URL &&
            !!(window as unknown as { electronAPI?: unknown }).electronAPI

        if (electronDetected) {
            // 【分支 A：桌面客户端】使用应用内预置的本地 HTML 路径
            setIsElectron(true)
            setDrawioBaseUrl(`${window.location.origin}/drawio/index.html`)
        } else {
            // 【分支 B：所有 Web 浏览器端访问】
            const envUrl = process.env.NEXT_PUBLIC_DRAWIO_BASE_URL

            // 自动纠偏拦截逻辑：
            // 满足以下任意一种情况时，强行使用当前浏览器的真实协议 + IP/域名 + 端口号重新拼装路径：
            // 1. !envUrl：环境变量未配置或为空字符串
            // 2. envUrl.includes("localhost")：构建阶段被硬编码/默认设置成了 localhost（云服务器公网访问主要死因）
            // 3. envUrl.startsWith("/")：配置为了相对路径（避免 react-drawio 内部 new URL() 报 Invalid URL 错误）
            if (!envUrl || envUrl.includes("localhost") || envUrl.startsWith("/")) {
                setDrawioBaseUrl(`${window.location.origin}/draw.io/index.html`)
            }
        }

        setIsLoaded(true)
    }, [pathname, router])

    const handleDrawioLoad = useCallback(() => {
        setIsDrawioReady(true)
        onDrawioLoad()
    }, [onDrawioLoad])

    const handleDarkModeChange = () => {
        const newValue = !darkMode
        setDarkMode(newValue)
        localStorage.setItem("next-ai-draw-io-dark-mode", String(newValue))
        document.documentElement.classList.toggle("dark", newValue)
        setIsDrawioReady(false)
        resetDrawioReady()
    }

    const handleDrawioUiChange = (theme: DrawioTheme) => {
        localStorage.setItem("drawio-theme", theme)
        setDrawioUi(theme)
        setIsDrawioReady(false)
        resetDrawioReady()
    }

    // Check mobile - reset draw.io before crossing breakpoint
    const isInitialRenderRef = useRef(true)
    useEffect(() => {
        const checkMobile = () => {
            const newIsMobile = window.innerWidth < 768
            if (
                !isInitialRenderRef.current &&
                newIsMobile !== isMobileRef.current
            ) {
                setIsDrawioReady(false)
                resetDrawioReady()
            }
            isMobileRef.current = newIsMobile
            isInitialRenderRef.current = false
            setIsMobile(newIsMobile)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [resetDrawioReady])

    const toggleChatPanel = () => {
        const panel = chatPanelRef.current
        if (panel) {
            if (panel.isCollapsed()) {
                panel.expand()
                setIsChatVisible(true)
            } else {
                panel.collapse()
                setIsChatVisible(false)
            }
        }
    }

    // Keyboard shortcut for toggling chat panel
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "b") {
                event.preventDefault()
                toggleChatPanel()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    return (
        <div className="h-screen bg-background relative overflow-hidden">
            <ResizablePanelGroup
                id="main-panel-group"
                direction={isMobile ? "vertical" : "horizontal"}
                className="h-full"
            >
                <ResizablePanel
                    id="drawio-panel"
                    defaultSize={isMobile ? 50 : 67}
                    minSize={20}
                >
                    <div
                        className={`h-full relative ${
                            isMobile ? "p-1" : "p-2"
                        }`}
                    >
                        <div className="h-full rounded-xl overflow-hidden shadow-soft-lg border border-border/30 relative">
                            {isLoaded && (
                                <div
                                    className={`h-full w-full ${isDrawioReady ? "" : "invisible absolute inset-0"}`}
                                >
                                    <DrawIoEmbed
                                        key={`${drawioUi}-${darkMode}-${currentLang}-${isElectron}`}
                                        ref={drawioRef}
                                        autosave
                                        onAutoSave={handleDiagramAutoSave}
                                        onExport={handleDiagramExport}
                                        onLoad={handleDrawioLoad}
                                        baseUrl={drawioBaseUrl}
                                        urlParameters={{
                                            ui: drawioUi,
                                            spin: false,
                                            libraries: false,
                                            saveAndExit: false,
                                            noSaveBtn: true,
                                            noExitBtn: true,
                                            dark:
                                                darkMode || drawioUi === "dark",
                                            lang: currentLang,
                                            // Enable offline mode in Electron to disable external service calls
                                            ...(isElectron && {
                                                offline: true,
                                            }),
                                        }}
                                    />
                                </div>
                            )}
                            {(!isLoaded || !isDrawioReady) && (
                                <div className="h-full w-full bg-background flex items-center justify-center">
                                    <span className="text-muted-foreground">
                                        Draw.io panel is loading...
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Chat Panel */}
                <ResizablePanel
                    key={isMobile ? "mobile" : "desktop"}
                    id="chat-panel"
                    ref={chatPanelRef}
                    defaultSize={isMobile ? 50 : 33}
                    minSize={isMobile ? 20 : 15}
                    maxSize={isMobile ? 80 : 50}
                    collapsible={!isMobile}
                    collapsedSize={isMobile ? 0 : 3}
                    onCollapse={() => setIsChatVisible(false)}
                    onExpand={() => setIsChatVisible(true)}
                >
                    <div className={`h-full ${isMobile ? "p-1" : "py-2 pr-2"}`}>
                        <Suspense
                            fallback={
                                <div className="h-full bg-card rounded-xl border border-border/30 flex items-center justify-center text-muted-foreground">
                                    Loading chat...
                                </div>
                            }
                        >
                            <ChatPanel
                                isVisible={isChatVisible}
                                onToggleVisibility={toggleChatPanel}
                                drawioUi={drawioUi}
                                onDrawioUiChange={handleDrawioUiChange}
                                darkMode={darkMode}
                                onToggleDarkMode={handleDarkModeChange}
                                isMobile={isMobile}
                            />
                        </Suspense>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
