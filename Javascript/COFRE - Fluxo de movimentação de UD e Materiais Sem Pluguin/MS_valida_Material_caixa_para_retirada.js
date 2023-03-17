var quantidadeColunaCodigoCaixa = 0;
var listColunasCodigoCaixa = [];
vMaterialCaixa = removeLineBreaks(pbLib.getVarValue("vMaterialCaixa"));
if (vMaterialCaixa.trim().length >= 14){
  listColunasCodigoCaixa = vMaterialCaixa.split(".");
  quantidadeColunaCodigoCaixa =  listColunasCodigoCaixa.length;  
     while( listColunasCodigoCaixa[2].trim().length < 10 ){
        listColunasCodigoCaixa[2] = "0" + listColunasCodigoCaixa[2];
    }  
  LeituraFinal = pbLib.getVarValue("vMateriaisRetirados") + listColunasCodigoCaixa[1] + ";;" + listColunasCodigoCaixa[2] + ";"+ listColunasCodigoCaixa[3] + ";Nao;|";
  pbLib.setVarValue("vMateriaisRetirados",LeituraFinal);    
  
  rota = "Caixa";
}else if (vMaterialCaixa === "9999"){
  rota = "Finaliza";
}else{
    rota = "Material";
    if (vMaterialCaixa === "" ){
        pbLib.showDialog("Atenção", "Campo Material não pode ser branco.");
        rota = "Caixa";
    }
}
if(rota === "Caixa" || rota === "Material"){
    contadorMovimentacao = contadorMovimentacao + 1;
    Contador = contadorMovimentacao; 
}
pbLib.goToRoute(rota);