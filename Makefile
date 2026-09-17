# ------------------------------------------------------------------------------
# 配置变量
# ------------------------------------------------------------------------------
IMAGE_NAME ?= next-ai-draw-io
VERSION    ?= v1.0
FULL_IMAGE := $(IMAGE_NAME):$(VERSION)
TAR_NAME   := $(IMAGE_NAME)-$(VERSION).tar

.PHONY: help build up down start stop restart logs save load clean

# 默认命令：显示使用说明
help:
	@echo "=============== Docker 运维管理脚本 ==============="
	@echo "  make build    - 编译并构建 Docker 镜像 ($(FULL_IMAGE))"
	@echo "  make up       - 在后台启动服务"
	@echo "  make down     - 停止并删除容器服务"
	@echo "  make start    - 恢复暂停的容器"
	@echo "  make stop     - 暂停容器（不销毁容器，配置不变）"
	@echo "  make restart  - 重启容器服务"
	@echo "  make logs     - 查看容器实时日志"
	@echo "  make save     - 导出镜像为 .tar 包 (用于搬运至内网)"
	@echo "  make load     - 从 .tar 包导入镜像 (内网解压)"
	@echo "  make clean    - 清理生成的 .tar 文件"
	@echo "=================================================="

# 1. 构建镜像 (确保打入离线静态资源路径)
build:
	@echo "--> 开始构建镜像: $(FULL_IMAGE) ..."
	docker build -t $(FULL_IMAGE) .

# 2. 启动服务
up:
	@echo "--> 启动容器服务 ..."
	docker compose up -d

# 3. 停止服务
down:
	@echo "--> 停止并删除容器 ..."
	docker compose down

# 4. 恢复暂停的容器
start:
	@echo "--> 恢复运行容器服务 ..."
	docker compose start

# 5. 暂停容器 (不销毁容器，配置不变)
stop:
	@echo "--> 暂停容器服务 ..."
	docker compose stop

# 6. 重启服务
restart:
	@echo "--> 重启容器 ..."
	docker compose restart

# 7. 查看日志
logs:
	docker compose logs -f --tail=100

# 8. 导出镜像包 (外网打好镜像后打包)
save:
	@echo "--> 导出镜像至文件 $(TAR_NAME) ..."
	docker save -o $(TAR_NAME) $(FULL_IMAGE)
	@echo "--> 导出完成！文件路径: ./$(TAR_NAME)"

# 9. 导入镜像包 (内网环境直接加载)
load:
	@echo "--> 从文件 $(TAR_NAME) 导入镜像 ..."
	docker load -i $(TAR_NAME)

# 10. 清理本地包
clean:
	rm -f $(TAR_NAME)