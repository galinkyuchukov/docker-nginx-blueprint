# Command to generate certificates using mkcert

```
mkcert -cert-file <path/to/cert>.pem -key-file <path/to/cert/key>.key <domain>
```

## Example

```
mkcert -cert-file ./certs/test-server.dev.local.pem -key-file ./certs/test-server.dev.local.key test-server.dev.local
```

```
mkcert -cert-file ./certs/example.pem -key-file ./certs/example.key example.com *.example.com
```

```
mkcert -cert-file ./certs/example.pem -key-file ./certs/example.key blog.example.com forum.example.com forum.example.com
```

## Source

https://dev.to/vishalraj82/using-https-in-docker-for-local-development-nc7
