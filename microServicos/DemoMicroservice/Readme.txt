# Diretorio da imagem
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
#local de trablho
WORKDIR /src
#copia o projeto
COPY DemoMicroservice.csproj .
RUN dotnet restore
COPY ..
#publica aplicação
RUN dotnet publish -c release -o /app

#Multi stage
#Primeiro construiu a aplicação.

FROM mcr.microsoft.com/dotnet/apsnet:5.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "DemoMicroservice.dll"]

comando "docker build -t demomicroservice ." cria a imagem a partir do docker file. Este comando irá Baixar a imagem informações conforme arquivo dockerfile.

o comando "docker images" exibira as imagens disponiveis.

Para criar e excutar um container, o seguinte comando deve ser executado:
"docker container run -it --rm -p 3000:80 --name demomicroservicecontainer demomicroservice"

Para visualizar a aplicação, acesse: "http://localhost:3000/weatherForecast"
