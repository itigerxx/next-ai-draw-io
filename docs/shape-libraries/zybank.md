# zybank

**Type:** image shapes

## Usage

Zybank provides custom architecture icons as image shapes.

Use the following style to create a Zybank icon:

```xml
<mxCell value="label" style="shape=image;image=/zybank-icons/{shape}.svg;aspect=fixed;" vertex="1" parent="1">
  <mxGeometry x="0" y="0" width="60" height="60" as="geometry" />
</mxCell>
```

For simple image shapes use:

```text
shape=image;image=/zybank-icons/{shape}.svg;aspect=fixed;
```

The `image` value must use the `/zybank-icons/` path followed by a supported shape name.

Example:

```text
shape=image;image=/zybank-icons/computer.svg;aspect=fixed;
```

Only use the Zybank shapes listed below. Do not invent other Zybank icon names or paths.

## Shapes (6)

### computer

Represents a computer, desktop client, or desktop application.

Use:

```text
shape=image;image=/zybank-icons/computer.svg;aspect=fixed;
```

### database

Represents a database or persistent data storage system.

Use:

```text
shape=image;image=/zybank-icons/database.svg;aspect=fixed;
```

### mobile

Represents a mobile device, mobile client, or mobile application.

Use:

```text
shape=image;image=/zybank-icons/mobile.svg;aspect=fixed;
```

### server

Represents a server or backend service.

Use:

```text
shape=image;image=/zybank-icons/server.svg;aspect=fixed;
```

### user

Represents an end user, customer, operator, or human actor.

Use:

```text
shape=image;image=/zybank-icons/user.svg;aspect=fixed;
```

### web-server

Represents a web server, web application, or web frontend.

Use:

```text
shape=image;image=/zybank-icons/web-server.svg;aspect=fixed;
```