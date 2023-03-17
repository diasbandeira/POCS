# Diretorio da imagem
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
#local de trablho
WORKDIR /src
#copia o projeto
COPY DemoMicroservice.csproj .
RUN dotnet restore
COPY . .
#publica aplicação
RUN dotnet publish -c release -o /app

#Multi stage
#Primeiro construiu a aplicação.

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "DemoMicroservice.dll"]

#comando: "docker build -t demomicroservice .", cria a imagem a partir do docker file.