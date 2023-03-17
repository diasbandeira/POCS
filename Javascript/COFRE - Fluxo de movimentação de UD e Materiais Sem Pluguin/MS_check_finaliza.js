var c = 0;
var DadosLidos = "";
pbLib.setVarValue("vMaterialCaixa","");
DadosLidos = pbLib.getVarValue("vMateriaisRetirados");
if(contadorMovimentacao > 0){
    rota = "Reposicionamento";
    listaDadosLidos = DadosLidos.split("|");
    qtdMateriaisCaixasLidas = listaDadosLidos.length;
    while( c < qtdMateriaisCaixasLidas){
       ListaRegistrosLidos[c] = 0;
        c = c + 1 ;
    }
    DadosColetados();
    PreencheItensLidos = false;
    pbLib.setVarValue("Acao","31");
    LeituraFinal = "";
}else{
    rota = "Aborta";
    pbLib.showDialog("Informação", "Movimentação abortada!");
}
pbLib.goToRoute(rota);