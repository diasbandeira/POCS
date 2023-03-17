var count = 0;
var colunaCM = 0;
var quantidadeColunasCaixa = 0;
var msgInvalida;
var listColunasCaixa = [];
var arrayRegistroMaterialCaixa = [];
rota = "Invalida";
CodigoUD = "";
CodigoMaterial = "";
LocalizacaoOrigem = "";
LocalizacaoDestino ="";
Quantidade = "";
vMaterialCaixa = removeLineBreaks(pbLib.getVarValue("vMaterialCaixaRep"));
PosiçaoArrayLido = -1;
if( vMaterialCaixa !== "" ){
    if (vMaterialCaixa.trim().length >= 14){
        colunaCM = 2;
        listColunasCaixa = vMaterialCaixa.split(".");
        quantidadeColunasCaixa =  listColunasCaixa.length;
        while( listColunasCaixa[2].trim().length <10 ){
            listColunasCaixa[2] = "0" + listColunasCaixa[2];
        }
        vMaterialCaixa = listColunasCaixa[2];
        CodigoUD = vMaterialCaixa;
        Quantidade= listColunasCaixa[3];
        msgInvalida = "Caixa não Encontrada!";
    }else{
        colunaCM = 0;
        CodigoMaterial = vMaterialCaixa;
        Quantidade  = "1";
        msgInvalida = "Material não Encontrado!";
    }
    while (count <= Contador ){
        arrayRegistroMaterialCaixa = listaDadosLidos[count].split(";");
        qtdeMaterialCaixaRep =  arrayRegistroMaterialCaixa.length;
        if 	(ListaRegistrosLidos[ count ] === 0){
            if(arrayRegistroMaterialCaixa[colunaCM] + ListaRegistrosLidos[ count ] === vMaterialCaixa + "0"){
                if (colunaCM === 0 ){
                    LocalizacaoOrigem = arrayRegistroMaterialCaixa[1];
                }
                PosiçaoArrayLido = count;
                count = Contador + 1;
                rota = "LocalDestino";
            }
        }
        count = count + 1;
    }
}
if (rota === "Invalida"){
    pbLib.showDialog("Atenção", msgInvalida);
    rota = "LerNovamente";
}
pbLib.goToRoute(rota);