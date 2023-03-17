function verificarCodigo(quantidade, codigoMaterial){
    var retorno = -1;
    var retornocx = -1;
    var posicaocx = -1;
    var posicaovzcx = 0;
    var LeuCaixa = "Nao";
    var LeuEAN = "Nao";
    var KITRelogio = "";
    var LocalicacaoCaixa = "";
    var listColunasCodigoCaixa = [];
    var quantidadeColunaCodigoCaixa = 0;
    var codigoMaterialCaixa="";
    codigoMaterial = removeLineBreaks( trim(codigoMaterial) );
    if(strlen(codigoMaterial) > 16){
        quantidadeColunaCodigoCaixa =  split(codigoMaterial, ".", listColunasCodigoCaixa);
        if(quantidadeColunaCodigoCaixa > 3){
           codigoMaterialCaixa = listColunasCodigoCaixa[1];
           KITRelogio = codigoMaterialCaixa;
           codigoMaterialColetado = codigoMaterialCaixa + "CF" + "Nao";
           quantidade = strToInt(listColunasCodigoCaixa[3]);
           CodigoCaixa = listColunasCodigoCaixa[2];
           while( strlen(CodigoCaixa) <10 ){
                CodigoCaixa = "0" + CodigoCaixa;
           }
           LeuCaixa = "Sim";
           retorno = findStringInArray(listaCaixas, quantidadeDePedidos,CodigoCaixa);
           if ( retorno > -1){
            if ( listaKitPromocional[retorno] != "" ){
                codigoMaterialCaixa = listaKitPromocional[retorno];       
                codigoMaterialCaixa = substring( codigoMaterialCaixa,0,strlen( codigoMaterialCaixa ) -5);
            }
            LocalicacaoCaixa = listaLocalizacoes[retorno];
            PosNR = listaPosNR[retorno];
            if( quantidade  !=  strToInt( listaQtdLocalizacao[retorno])){
                MTMensagem = "A Quantidade da UD " +  CodigoCaixa + " lida, esta divergente da quantidade da caixa, por favor solicitar a transferencia para o PAREDÃO da quantidade solicitada.";
                codigoMaterial = "" ;  
                codigoMaterialColetado = "";
                quantidade = 0;             
                retorno = -1;  
                LeuCaixa = "Sim";
            }else{   
                LeituraFinal = getVarValue("vCodigoMaterial") + codigoMaterialCaixa + ";" + LocalicacaoCaixa + ";" + CodigoCaixa  + ";" + intToStr(quantidade) +";"+ PosNR +"|";
                listaCaixas[retorno] = "Lida";
            } 
           }else{
            MTMensagem = "A UD " +  CodigoCaixa + " lida, não pertence a este pedido, ou foi lida fora da sequenica enviada. Por favor verificar e fazer a leitura na sequencia correta. Verificar tambem se a quantidade pedida é menor que a quantidade da UD, se for este o caso, transferir a UD para o PAREDÃO, e fazer a leitura individual do item até atingir a quantidade solicitada.";
            codigoMaterial = "";
            codigoMaterialColetado = "";
            quantidade = 0;
            retorno = -1;
            LeuCaixa = "Sim";
           }  
       }
    }
    if (LeuCaixa == "Nao"){   
       quantidade = 1;
       PosicaoMaterial = -1;
      if (strlen(codigoMaterial) >=7 ){  
        if( substring(codigoMaterial,0,7) == "7893689" ){
           codigoMaterialColetado = "";
           MaterialMsg = codigoMaterial;
           codigoMaterial = codigoMaterial + "CA" + "Nao";
           PosicaoMaterial = findStringInArray(listaEANs, quantidadeDePedidos, codigoMaterial);
           if (PosicaoMaterial == -1){
		    PosicaoMaterial = findStringInArray(listaEANsK, quantidadeDePedidos, codigoMaterial);
           }
           if (PosicaoMaterial > -1){
              if ( listaKitPromocional[PosicaoMaterial] == "" ){
                codigoMaterial = listaCodigos[PosicaoMaterial];
                PosNR = listaPosNR[PosicaoMaterial];
              }else{ 
                codigoMaterial = listaKitPromocional[PosicaoMaterial];
                PosNR = listaPosNR[PosicaoMaterial];
              }
           }
           pbLib.setVarValue("codigoMaterial",codigoMaterial);
           codigoMaterialColetado = codigoMaterial;
           retorno = PosicaoMaterial;
           LeuEAN = "Sim";
        }
      }
    }
    if( LeuCaixa == "Nao" && LeuEAN == "Nao" ){
      MaterialMsg = codigoMaterial;
      codigoMaterial = codigoMaterial +"CA"+ "Nao";
      PosicaoMaterial =  findStringInArray(listaCodigos, quantidadeDePedidos,codigoMaterial);
      if (PosicaoMaterial == -1){
          PosicaoMaterial =  findStringInArray(listaKitPromocional, quantidadeDePedidos,codigoMaterial);
      }
      retorno = PosicaoMaterial;
      if (  PosicaoMaterial > -1 ){ 
          if ( listaKitPromocional[PosicaoMaterial] != "" ){ 
               codigoMaterial = listaKitPromocional[PosicaoMaterial];
               PosNR = listaPosNR[PosicaoMaterial];
               codigoMaterialColetado = codigoMaterial;
           }else{ 
              codigoMaterialColetado = codigoMaterial;
              PosNR = listaPosNR[PosicaoMaterial];
           }
       }else{
            MTMensagem = "O código do material " + MaterialMsg + " não pertence a esse pedido, ou já foi lido completamente.";
            codigoMaterial = "";
             codigoMaterialColetado = "";
             PosNR = "";
             retorno = -1;
      }
    }
  return retorno;
}