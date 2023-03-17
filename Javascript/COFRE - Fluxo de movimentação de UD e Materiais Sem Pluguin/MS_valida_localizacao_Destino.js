rota = "invalida";
if (pbLib.getVarValue("vLocalizacaoDestino") === "9999"){
  rota = "CancelaLeitura01";
}
if (pbLib.getVarValue("vLocalizacaoDestino").length !== 10 && rota === "invalida"){
  pbLib.showDialog("Atenção","Código <" + pbLib.getVarValue("vLocalizacaoDestino") + "> da Localização Incorreta.");
  rota = "ErroLeitura01";
}
if (pbLib.getVarValue("vLocalizacaoDestino").length === 10 ){
    rota = "Continua01";
    ListaRegistrosLidos[PosiçaoArrayLido] = 1;
    contadorMovimentacao = contadorMovimentacao - 1;
  	LeituraFinal = pbLib.getVarValue("vMateriaisArmazenados") + CodigoUD + ";" + CodigoMaterial + ";" +  LocalizacaoOrigem + ";" + pbLib.getVarValue("vLocalizacaoDestino") + ";" + Quantidade + "|";
   pbLib.setVarValue("vMateriaisArmazenados",LeituraFinal);
    if(contadorMovimentacao === 0 ){
        pbLib.showDialog("Aviso","Leitura Finalizada");
        rota = "SAP";
    }else{
        DadosColetados();
    }
}
if(rota === "invalida"){
    pbLib.showDialog("ERRO","Leitura Inválida");
    rota = "ErroLeitura01";
}
pbLib.goToRoute(rota);