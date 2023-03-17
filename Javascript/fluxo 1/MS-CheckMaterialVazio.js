//#include <strings.ms>
//#include <parsing.ms>
//#include <arrays.ms>  

// listas de controle

//string listaEANs[600]; // Alterado 23/09/2016 de 350 p/ 600
//string listaEANsK[600];
//string listaPosNR[600];
//string listColLoc[600];
//string listaCaixas[600];
//string listaCodigos[600];
//string listaLocalizacoes[600];
//string listaMaterialLocal[600];
//string listaKitPromocional[600];
//string listaColunasCaixas[600];

//string listaQtdLocalizacao[600]; // Inclusão Evandro Luiz
//string listaTipoLocalizacao[600]; // Inclusão Evandro Luiz
//string listColunasLocalizacoes[600];
//string listColunasQtdLocalizacao[600]; // Inclusão Evandro Luiz
//string listColunasTipoLocalizacoes[600]; // Inclusão Evandro Luiz

//int listaQuantidades[600];
//int listaPedidoSeparado[600];

// Array para controle de linhas do pedido (SKU´S) diferentes
// Confirmado 350 posicoes // Alterado 06/10/2016
// Confirmado 300 posicoes // Alterado 19/02/2017 (Evandro Luiz)
int ArraysPrimarios = 300;
string listaEANs[300]; 
string listaEANsK[300];
string listaPosNR[300];
string listColLoc[300];
string listaKitPromocional[300];
string listaQtdLocalizacao[300]; 
string listaTipoLocalizacao[300]; 
string listColunasQtdLocalizacao[300]; 
int listaQuantidades[300];
int listaPedidoSeparado[300];
// fim Array para controle de linhas do pedido (SKU´S) diferentes

// Array para controle de UD´s e localizaçoes por item
// Confirmado 600 posicoes // Alterado 06/10/2016
// Confirmado 400 posicoes // Alterado 19/02/2017 (Evandro Luiz)
int ArraysSegundarios = 400;
string listaCaixas[400];
string listaCodigos[400];
string listaLocalizacoes[400];
string listaMaterialLocal[400];
string listaColunasCaixas[400];
string listColunasLocalizacoes[400];
string listColunasTipoLocalizacoes[400]; // Inclusão Evandro Luiz
// fim Array para controle de UD´s e localizaçoes por item


string Acao = "";
string rota = "";
string Tipo = "";
string PosNR = "";
string mensagem="";
string cMaterial = "";
string CodigoCaixa = "";
string MaterialMsg = ""; 
string MTMensagem = "";
string LeituraFinal;
string listaColunasCX;
string localizacaoMat = "";
string localizacaoCaixa ="";
string vMaterialAnterior="";
string LocalicacaoAnterior = "";  
string vLocalizacaoAnterior="";
string codigoMaterialCaixa="";    
string codigoMaterialColetado="";
string LocalDefinido;

boolean AcabouLeitura = false;
boolean FezSincronizacao = false;
// Alteração para incluir tipo de deposito nas pesquisas  04/03/2016 – Evandro Luiz
boolean ZerouLocalizaçcao = false;

//variáveis

int x=0;
int w=0;
int i = 0;
int l = 0; 
int m = 0;
int quantidade = 0;
int NumeroCaixas = 0;
int qtdemateriais = 0;
int qtdCaracteres = 80;
int PosicaoMaterial = 0; // Inclusao Evandro Luiz -
int quantidadeOutros = 0;
int posicaoNasListas = 0;
int quantidadeDeLidos = 0;
int NumeroLocalizacoes = 0;
int quantidadeDePedidos = 0;
int PosicaoItemRepetido = -9; // Saber se estou na mesma posição e nao pedir localização novamente.
// Variavel de retorno para o SAP valor atual 800 alterado para 600 19/02/2017 (Evandro Luiz)
int TamanhoMaximoString = 600; //Controle tamanho string retorno SAP 
int quantidadeLocalizacoes = 0; // Inclusão Evandro Luiz


string getChar(int code) 
{
  int array[1];
  array[0] = code;
  return buildStringFromChars(array, 1);
}

string lineBreak() 
{
  return getChar(10);
}

string removeLineBreaks(string str) 
{
  return replace(replace(str, lineBreak(), ""), getChar(13), "");
}


// gera e atualiza a mensagem da caixa de código de barras.
void atualizaMensagem(){

  // limpa variável
  mensagem = "";
    
   l=0; 
  // zerando a variável de controle para entrada no while
  i=0;
//  showDialog("Quantidade Materiais",intToStr(quantidadeDePedidos) );
  NumeroLocalizacoes = 0; 
  //percorre a lista de pedidos.
   while(i < quantidadeDePedidos){ 
      // parte o código das localizaçoes separadas pelo ponto (.) e armazena a quantidade e a lista // Evandro Luiz
      quantidadeLocalizacoes = 0;
      quantidadeLocalizacoes =  split(listaLocalizacoes[i], ".", listColunasLocalizacoes);
      NumeroLocalizacoes = NumeroLocalizacoes + quantidadeLocalizacoes; // Guarda numero de localizaçoes
      NumeroCaixas = split(listaCaixas[i], ".", listaColunasCaixas); // Gerando dados listColunasTipoLocalizacoes      
      quantidadeOutros = split(listaQtdLocalizacao[i], ".", listColunasQtdLocalizacao);  // Gerando dados listColunasQtdLocalizacao
      quantidadeOutros = split(listaTipoLocalizacao[i], ".", listColunasTipoLocalizacoes); // Gerando dados listColunasTipoLocalizacoes      
    // showDialog("MATERIAL", listaCodigos[i]);
   /// valida se o pedido ainda não foi separado NOVA VERSAO.
   if(listaPedidoSeparado[i] == 0){
     if (listaKitPromocional[i] == "")
     {  
       mensagem = mensagem + "<b><h2> "+ substring( listaCodigos[i],0,strlen( listaCodigos[i] ) -5);
     }
     else 
     { mensagem = mensagem + "<b><h2> "+ substring( listaKitPromocional[i],0,strlen( listaKitPromocional[i] ) -5); }
     
     mensagem = mensagem + "&nbsp;&nbsp;&nbsp;&nbsp; Quantidade: " + intToStr(listaQuantidades[i]) + "</b></h2><br/>";
     
     l=0; 
     while(l < quantidadeLocalizacoes)    // Inclusão Evandro Luiz 
   { 
         if(listColunasTipoLocalizacoes[l] == "CA")
         {Tipo = "Caixa Aberta";}
         else
         {Tipo = "Caixa Fechada";}
           
         mensagem = mensagem + " Loc: " + listColunasLocalizacoes[l] + "&nbsp;&nbsp; Qtd Loc: " + listColunasQtdLocalizacao[l]  + "&nbsp;&nbsp; Tipo: " + Tipo + " <br/>";
        if (listaColunasCaixas[l] != "")
        { 
          mensagem = mensagem + " CX: " + listaColunasCaixas[l] +  "&nbsp;&nbsp;&nbsp;&nbsp;  No. Item: " + listaPosNR[i]  +  " <br/><br/>";
        }  
       else
       {  
           mensagem = mensagem + "  No. Item: " + listaPosNR[i]  + " <br/>";
        
       } 
       
       l = l + 1;
     } 
   }   
        i = i + 1;
 }
   // enviar o valor da variável para a tela.
   setVarValue("msgCodigobarra",mensagem);
}

// gera e atualiza a mensagem da caixa de código de barras.
void atualizaMensagemLocalizacao(){
  l=0; 
  i=PosicaoMaterial;
  mensagem = "";
  
   quantidadeLocalizacoes = 0;
   quantidadeLocalizacoes =  split(listaLocalizacoes[i], ".", listColunasLocalizacoes);
   NumeroCaixas = split(listaCaixas[i], ".", listaColunasCaixas); // Gerando dados   
//   showDialog("Posiçao Material",intToStr(PosicaoMaterial));
  
   if (listaKitPromocional[i] == "")
   {  
       mensagem = mensagem + "<b><h2> "+ substring( listaCodigos[i],0,strlen( listaCodigos[i] ) -5) + "</b></h2><br/>";
   }
   else 
   { mensagem = mensagem + "<b><h2> "+ substring( listaKitPromocional[i],0,strlen( listaKitPromocional[i] ) -5)  + "</b></h2><br/>"; }

    l=0; 

   if(listColunasTipoLocalizacoes[l] == "CA")
         {Tipo = "Caixa Aberta";}
         else
         {Tipo = "Caixa Fechada";}
  
     while(l < quantidadeLocalizacoes)    // Inclusão Evandro Luiz 
   { 
         // Alteração para incluir tipo de deposito nas pesquisas  04/03/2016 – Evandro Luiz         
         LocalDefinido = listColunasLocalizacoes[l]; 
//         showDialog("LocalDefinido",)
         mensagem = mensagem + " Loc: " + listColunasLocalizacoes[l] + "&nbsp;&nbsp; Qtd Loc: " + listColunasQtdLocalizacao[l]  + "&nbsp;&nbsp; Tipo: " + Tipo + " <br/>";
        if (listaColunasCaixas[l] != "")
        { 
          mensagem = mensagem + " CX: " + listaColunasCaixas[l] +  "&nbsp;&nbsp;&nbsp;&nbsp;  No. Item: " + listaPosNR[i]  +  " <br/><br/>";
        }  
       else
       {  //mensagem = mensagem +  " <br/>";
          mensagem = mensagem + "  No. Item: " + listaPosNR[i]  + " <br/> Para Sair use [9999]. <br/>";
       } 
       
      l = l + 1;
     }   
  
  setVarValue("cmsgLocalizacao",mensagem);  
  setVarValue("cmsgLocalizacao2",mensagem);  
  
} 



//Funcao que lista itens nao lidos
string RetornaItensNaoLidosDesligado()
{
  
i=0;
  
while(i < quantidadeDePedidos)
{ 
   /// Ler Materiais que nao foram lidos.
   if(listaPedidoSeparado[i] == 0)
   {
     if (listaKitPromocional[i] == "")
     {  cMaterial = substring( listaCodigos[i],0,strlen( listaCodigos[i] ) -3); }
     else 
     { cMaterial = listaKitPromocional[i]; }
      //  Layout Leitura Final
      //    01 - Material
      //    02 - Localizacao
      //    03 - Caixa
      //    04 - Quantidade  
      //    05 - PosNR
      // O retorno para o SAP os itens nao lidos irão com quantidade = 0 
     if(cMaterial != "" )                                                                      { LeituraFinal = getVarValue("vCodigoMaterial") + cMaterial + ";;;0|"; }
       
      setVarValue("vCodigoMaterial",LeituraFinal);    
//      showDialog("Carregou",LeituraFinal);
      cMaterial="";
   }   
   i = i + 1;
 }  
return "OK";
}


// funções globais
void IniciarFluxo(){
 
  string ValorArray = "";
  //armazena o valor do campo adicional da OS
  string variavelCampoAdicional ="";

  //armazena cada linha do campo adicional
  string listaLinhas[ 400 ]; // Alterado 20/02/2017 de 350 p/ 400
//  string listaLinhas[ 350 ]; // Alterado 23/09/2016 de 350 p/ 600
  
  //armazena temporariamente cada coluna (codigo,EAN,localização,quantidade;Tipo Localizaçao, kip promocional;caixas;posnr;EANK)
  string listaColunas[10];

  // armazena a quantidade de linhas do campo adicional
int quantidadeLinhas = 0;  
  
 // armazena a quantidade de colunas
int quantidadeColunas = 0;   
    
  // obtem os pedidos da OS (Campo Adicional)
variavelCampoAdicional = getVarValue("Materiais");

  //remove os espaços desnecessários
variavelCampoAdicional = trim(variavelCampoAdicional);  

 //separa os pedidos por linhas, armazena na listaLinhas e obtem a quantidade de pedidos  
quantidadeLinhas = split(variavelCampoAdicional, lineBreak(), listaLinhas);
// Descrição da Variavel da Milestone de quantidade invalida
setVarValue("mtQtdInvatida","Quantidade lida não pode ser maior que a quantidade do pedido!");
  
 //    showDialog("Qtd linhas",intToStr(quantidadeLinhas));
 // Evita o acesso a uma posição do array nao instanciado.
 i= 0;
 while(i < ArraysSegundarios) // Alterado 20/02/2017 
 {
    listaMaterialLocal[i] ="";
     i = i + 1;
 }
  
 i= 0; 
while(i < ArraysPrimarios )  //Alterado 20/02/2017 
{
   listaEANs[i]="";
   listaEANsK[i]="";
   listaPosNR[i]="";
   listaCodigos[i]="";
   listaKitPromocional[i]="";
   listaQtdLocalizacao[i]=""; 
   listaTipoLocalizacao[i]=""; 
   listColunasQtdLocalizacao[i]=""; 
   i = i + 1;
} 
  
  // zerando a variável de controle para entrada no while
  i =0;
  
  // percorre a listaLinhas e preenche a listaCodigos,listaLocalizacao,listaQuantidade // inclui Codigo EAN
    m=0; // variavel para controlar controlar materias x localizacoes - vetor listColunasLocalizacoes
  
  while(i < quantidadeLinhas){
  
    // separa as colunas pelo ; e armazena na listaColunas
      quantidadeColunas = split(listaLinhas[i], ";", listaColunas);
    // valida a quantidade de colunas
    if(quantidadeColunas == 10)
    {      
        //Carrega as listas de controle com os valores da coluna  
        // Alteração para incluir tipo de deposito nas pesquisas  04/03/2016 – Evandro Luiz
       listaCodigos[i] = listaColunas[0] + listaColunas[5] + "Nao";
       listaEANs[i] = listaColunas[1] + listaColunas[5]+ "Nao"; // O "Não" garante que ainda nao li o codigo atendendo toda a quantidade solicitada. 
       listaQuantidades[i]= strToInt(trim(listaColunas[2])); 
       listaLocalizacoes[i] = listaColunas[3];
       listaQtdLocalizacao[i]= listaColunas[4];
       listaTipoLocalizacao[i] = listaColunas[5]; // Evandro
       if ( listaColunas[6] != "")
       {listaKitPromocional[i] = listaColunas[6]  + listaColunas[5] + "Nao";}
       listaCaixas[i] = trim(removeLineBreaks(listaColunas[7]));
       listaPosNR[i]  = listaColunas[8];
       listaEANsK[i] = listaColunas[9] + listaColunas[5]+ "Nao"; // O "Não" garante que 
      // parte o código das localizaçoes separadas pelo ponto (.) e armazena a quantidade e a lista // Evandro Luiz
      quantidadeLocalizacoes = 0;
      quantidadeLocalizacoes =  split(listaLocalizacoes[i], ".", listColLoc);      
      
  // ignora a linha vazia
  if(quantidadeLocalizacoes >= 1)
  {
    quantidadeLocalizacoes = quantidadeLocalizacoes -1;
  }
  // showDialog("Quantidade",intToStr(quantidadeLocalizacoes));
  while(quantidadeLocalizacoes > -1)
  {
    if (listaKitPromocional[i] == "")
    {  
       localizacaoMat = listaCodigos[i] + listColLoc[quantidadeLocalizacoes]  ; 
    }
    else
    {  
       localizacaoMat = listaKitPromocional[i] + listColLoc[quantidadeLocalizacoes];  
    }
        
    listaMaterialLocal[i] = localizacaoMat;
    
    
    quantidadeLocalizacoes = quantidadeLocalizacoes -1; 
  }
        listaPedidoSeparado[i]= 0;
    }
     // incrementa a variavel de controle
     i = i + 1;
 }
   
  // a quantidade de pedido receberá a quantidade de linhas (um pedido por linha).
  quantidadeDePedidos = quantidadeLinhas;  

  // chama a função para gerar a mensagem para o campo de codigo de barras.
  atualizaMensagem();
}


 int verificarCodigo(ref int quantidade, string codigoMaterial){
    // Variavel de retorno
    int retorno = -1 ;
    int retornocx = -1;
    int posicaocx = -1;
    int posicaovzcx = 0;
    string LeuCaixa = "Nao";
    string LeuEAN = "Nao";
    string KITRelogio = "";
    string LocalicacaoCaixa = ""; 
     
    // armazena a lista de colunas do código da caixa.
    string listColunasCodigoCaixa [10];
    // armazena a quantidade de colunas encontradas no código.
    int quantidadeColunaCodigoCaixa = 0;
    // armazena o código do material da caixa.
    string codigoMaterialCaixa="";         
    
    codigoMaterial = removeLineBreaks( trim(codigoMaterial) ) ;
    // valida se o código lido é de caixa (maior que 14) ou unitário.
    // Alterado dia 16/01/2016 -> 16 - motivo relogios com masi de 14 digitos.
    if(strlen(codigoMaterial) > 16)
    {
         //código exemplo
        //2000.96241G0PMNA1.1096440.4.JCARDOSO.13/11/2014 &a2268V       
        // parte o código da caixa (pelo ponto (.)) e armazena a quantidade e a lista
        quantidadeColunaCodigoCaixa =  split(codigoMaterial, ".", listColunasCodigoCaixa);                
        // valida se a quantidade de código está correta.
        if(quantidadeColunaCodigoCaixa > 3)
        {         
           // carrega o código do material unitário.
           codigoMaterialCaixa = listColunasCodigoCaixa[1];   
           // Alteração incluir tipo de deposito nas pesquisas  04/03/2016 – Evandro Luiz
           KITRelogio = codigoMaterialCaixa;
           codigoMaterialColetado = codigoMaterialCaixa + "CF" + "Nao"; // Codigo para busca 
           // carrega a quantidade de material que existe na caixa.
           quantidade = strToInt(listColunasCodigoCaixa[3]);  
         
           // Carrega Codigo da Caixa
           CodigoCaixa = listColunasCodigoCaixa[2];     
           // Preenche com zeros a esquesda
           while( strlen(CodigoCaixa) <10 )    // Inclusão Evandro Luiz 
            { CodigoCaixa = "0" + CodigoCaixa;  }                   

           // LeuCaixa
           LeuCaixa = "Sim";          
        
           //Pesquisa caixa
           retorno = findStringInArray(listaCaixas, quantidadeDePedidos,CodigoCaixa);
        
           // Se encontro a caixa, verifica o restante dos dados
           if ( retorno > -1)
           {  
             
//                showDialog("Cheguei aqui " , KITRelogio) ;
              // Verificar se é kit promocional
              if ( listaKitPromocional[retorno] != "" )
              { 
                  codigoMaterialCaixa = listaKitPromocional[retorno];       
                  //Retira caracteres de controle do final "CFNAO" que esta no array ListaKitPromocional.
                  codigoMaterialCaixa = substring( codigoMaterialCaixa,0,strlen( codigoMaterialCaixa ) -5);
              }

              // carrega o localização da caixa
              LocalicacaoCaixa = listaLocalizacoes[retorno] ;         
              PosNR = listaPosNR[retorno];             

              // Verifica os dados:
              // Verifica Quantidade da UD a quantidade Lida
              // Se for divergente informar ao USUARIO
               
               if( quantidade  !=  strToInt( listaQtdLocalizacao[retorno] )  )
               {
                   MTMensagem = "A Quantidade da UD " +  CodigoCaixa + " lida, esta divergente da quantidade da caixa, por favor solicitar a transferencia para o PAREDÃO da quantidade solicitada.";
                  codigoMaterial = "" ;  
                  codigoMaterialColetado = "";
                  quantidade = 0;             
                  retorno = -1;  
                  LeuCaixa = "Sim";
               }
               else
               {   
                    LeituraFinal = getVarValue("vCodigoMaterial") + codigoMaterialCaixa + ";" + LocalicacaoCaixa + ";" + CodigoCaixa  + ";" + intToStr(quantidade) +";"+ PosNR +"|";
                    listaCaixas[retorno] = "Lida"; 
              //showDialog("Estou aqui",LeituraFinal);
               } 
           }
           else
           {
             MTMensagem = "A UD " +  CodigoCaixa + " lida, não pertence a este pedido, ou foi lida fora da sequenica enviada. Por favor verificar e fazer a leitura na sequencia correta. Verificar tambem se a quantidade pedida é menor que a quantidade da UD, se for este o caso, transferir a UD para o PAREDÃO, e fazer a leitura individual do item até atingir a quantidade solicitada.";
              codigoMaterial = "";  
              codigoMaterialColetado = "";
              quantidade = 0;             
              retorno = -1;  
              LeuCaixa = "Sim";
           }  
       }
    }
   
   // Fim verificação Leitura Caixa
   
   
   // Inicio Leitura EAN   
    if (LeuCaixa == "Nao")
    {   
       // código unitário
       quantidade = 1; 
         PosicaoMaterial = -1;
      // remove os espaços desnecessários e pesquisa a posição do pedido na lista.
      // Verifica se o codigo passado é um codigo EAN ou um codigo de Material -- Evandro Luiz
      // Para identificar o codigo EAN usamos o seguinte criterio
      // São 13 digitos sento que os 7 primeiros sao fixos : 7893689
        // showDialog("Codigo Lido a1",codigoMaterial + " - " + substring(codigoMaterial,0,7));
      if (strlen(codigoMaterial) >=7 )
      {  
    if( substring(codigoMaterial,0,7) == "7893689" )
        {
           // Definir variavel ValidaListaCodigos com a lista de EAN´s
           codigoMaterialColetado = "";
           // Alteração para incluir tipo de deposito nas pesquisas  04/03/2016 – Evandro Luiz
           MaterialMsg = codigoMaterial;
           codigoMaterial = codigoMaterial + "CA" + "Nao";
 
           PosicaoMaterial = findStringInArray(listaEANs, quantidadeDePedidos, codigoMaterial);
           
           // Se nao achar EAN pricipal procurar com o EAN do KIT 
           if (PosicaoMaterial == -1) 
           {
			   PosicaoMaterial = findStringInArray(listaEANsK, quantidadeDePedidos, codigoMaterial);      
           }  
      
           if (PosicaoMaterial > -1) 
           {
              // Atribui Variavel para leitura EAN
              // Verificando se o codigo é um kit promocional ou nao
              if ( listaKitPromocional[PosicaoMaterial] == "" )
              { //codigoMaterial = trim( listaCodigos[PosicaoMaterial] ) ;
                codigoMaterial = listaCodigos[PosicaoMaterial] ;
                PosNR = listaPosNR[PosicaoMaterial];
              }
              else
              { 
                //codigoMaterial = trim(listaKitPromocional[PosicaoMaterial] ); 
                codigoMaterial = listaKitPromocional[PosicaoMaterial]; 
                PosNR = listaPosNR[PosicaoMaterial];
              }
           }
           setVarValue("codigoMaterial",codigoMaterial);   
           codigoMaterialColetado = codigoMaterial;
            
           //   setVarValue("vCodigoMaterial",codigoMaterial);   
           retorno = PosicaoMaterial;
           // Muda Variavel para lido
           LeuEAN = "Sim";
        }
      }
    }

    if( LeuCaixa == "Nao" && LeuEAN == "Nao" )
    {
      // Alteração para incluir tipo de deposito nas pesquisas  04/03/2016 – Evandro Luiz
      MaterialMsg = codigoMaterial;
      codigoMaterial = codigoMaterial +"CA"+ "Nao";
      PosicaoMaterial =  findStringInArray(listaCodigos, quantidadeDePedidos,codigoMaterial);

      // Se nao achar com o codigo normal, procurar com o codigo do KIT 
      if (PosicaoMaterial == -1) 
      {
          PosicaoMaterial =  findStringInArray(listaKitPromocional, quantidadeDePedidos,codigoMaterial);
      }  
      
      retorno = PosicaoMaterial;      
      
      if (  PosicaoMaterial > -1 ) // Achou o Material
      { 
          if ( listaKitPromocional[PosicaoMaterial] != "" )
          { 
               // codigoMaterial = trim( listaKitPromocional[PosicaoMaterial] );  
               codigoMaterial = listaKitPromocional[PosicaoMaterial] ;  
               PosNR = listaPosNR[PosicaoMaterial];
               codigoMaterialColetado = codigoMaterial;
           } 
           else
           { 
              codigoMaterialColetado = codigoMaterial; 
              PosNR = listaPosNR[PosicaoMaterial];
           }
       } 
       else
       {
            MTMensagem = "O código do material " + MaterialMsg + " não pertence a esse pedido, ou já foi lido completamente.";
            codigoMaterial = "";  
             codigoMaterialColetado = "";
             PosNR = "";
             retorno = -1; 
      }  // Fecha if (  retorno > -1 )
      
    }
  return retorno;
}

string separarPedido(string codigoMaterial){

  int quantidade =1; 
  int iTextoLido = 0;
  string sTextoLido ="";
  
  rota ="Invalida"; // Seta a variavel como Invalida.

  codigoMaterial = removeLineBreaks( trim(codigoMaterial) ) ;
  
  // caso informado um código vazio direciona para ocorrência.
 if(trim(codigoMaterial) =="" || trim(codigoMaterial) == "9999"  )
 { 
   
   if(trim(codigoMaterial) == "9999"){   
     // Verifica itens nao lidos;
     //RetornaItensNaoLidos();
     rota = "Ocorrencia";   
   } 

   if(trim(codigoMaterial) == "")
   {   
     rota = "LeituraInvalida";   
   } 
   
 }
  else
 { 
  
   // define rota padrão.
  rota = "Continuar";    
    
   // verifica se é caixa ou material unitário e retorna a posição na lista e quantidade.
   posicaoNasListas = verificarCodigo(quantidade, codigoMaterial);   
   // Alteração para incluir tipo de deposito nas pesquisas  04/03/2016 – Evandro Luiz
    
   if( ZerouLocalizaçcao )
   {  vMaterialAnterior = ""; }  
    
//   showDialog("Linha 489 - Posição Lista","Posição: " + intToStr(posicaoNasListas) );
  // valida se o pedido foi encontrado.
  if(posicaoNasListas > -1)
  {    

    // se a quantidade do material for menor ou igual que a definida no pedido.
    if(quantidade <= listaQuantidades[posicaoNasListas])
    {
       
       // decrementa a quantidade de pedidos.
       listaQuantidades[posicaoNasListas] =  listaQuantidades[posicaoNasListas] - quantidade;
      
//    showDialog("Mensagem","valida se a separação desse material já foi finalizada." );
    
    // valida se a separação desse material já foi finalizada.
    if(listaQuantidades[posicaoNasListas] == 0)
    {   
        // 03/03/2016 EVANDRO LIMPANDO LOCALIZACAO
        ZerouLocalizaçcao = true;         
      
        // marca o material como Separado.
        listaPedidoSeparado[posicaoNasListas] = 1;
        // Alteração para incluir tipo de deposito nas pesquisas  04/03/2016 – Evandro Luiz
        listaEANs[posicaoNasListas] = substring(listaEANs[posicaoNasListas],0,13) + "XXSim" ;
        // showDialog("Lista 01",listaEANs[posicaoNasListas]);
        if( strlen(listaEANsK[posicaoNasListas]) > 13  )
        {   listaEANsK[posicaoNasListas] = substring(listaEANsK[posicaoNasListas],0,13) + "XXSim" ;}
        // showDialog("Lista 02",listaEANsK[posicaoNasListas]);
       listaCodigos[posicaoNasListas] = substring(listaCodigos[posicaoNasListas],0,strlen( listaCodigos[posicaoNasListas]) -5) + "XXSim";  
        // showDialog("Lista 03",listaCodigos[posicaoNasListas]);
      if (listaKitPromocional[posicaoNasListas] != "")
      {  listaKitPromocional[posicaoNasListas] = substring(listaKitPromocional[posicaoNasListas],0,strlen( listaKitPromocional[posicaoNasListas]) -5) + "XXSim";  }
        //   showDialog("Lista 04",listaKitPromocional[posicaoNasListas]);
        // acrescenta a variável de controle de quantidade de pedidos lidos.
        quantidadeDeLidos = quantidadeDeLidos + 1;
      
        // verifica se já leu todos os pedidos.
        if(quantidadeDeLidos >= quantidadeDePedidos)
        {
            // preenche a variável vFinalizado com Sim.
            setVarValue("vFinalizado","Sim");
            // retorna rota finalizada.
            rota ="Finalizado";
            //showDialog("Linha 621 Global Stripts", rota);        
        }  
    }
    atualizaMensagem();
    }
    else
    {
          //Se foi leitura de caixa nao foi validado limpa variavel LeituraFinal
          LeituraFinal = "";      
          // retorna quando a quantidade coletada é maior que a pedida.
          rota ="QuatidadeInvalida";
    }
  }
   else
  {
     // retorna rota inválido caso o código não exista.
     if (codigoMaterial != "")
     {  
//        setVarValue("vCodigoInvalido","O código do material ["+ MaterialMsg +"] não pertence a esse pedido.");  
        //MTMensagem = "O código do material " + MaterialMsg + " não pertence a esse pedido, ou já foi lido completamente.";
         MTMensagem = "O código do material é inválido ou já foi lido completamente, ou a UD lida 
está com a quantidade da etiqueta divergênte do sistema. Se for este o caso informar 
aos Lideres para verificar o caso.";       
        MaterialMsg = "";
     }
      //Se foi leitura de caixa nao foi validado limpa variavel LeituraFinal
      LeituraFinal = "";      
     rota ="Invalida";
   }
 }
  
//  showDialog("Linha 551 - Posição Lista","Posição: " + intToStr(posicaoNasListas) + "Rota: " + rota );
//  if (posicaoNasListas == -1 && rota == "Continuar")
//  {
//     rota ="Invalida";
//  }  
  
  return rota;
}


string identificaCaixaMaterial(string codigoMaterial)
{
// Foi alterado de 14 para 17 porque os materiais tem um controle a mais
// Por calsa do kit promocional , entao no final tem mais 3 digitos, que é a palavra "Nao"
// Evandro Luiz - Mudado dia 16/01/2016 para 19
 // Alteração para incluir tipo de deposito nas pesquisas  04/03/2016 – Evandro Luiz incliu + 2 digitos do tipo CA ou CF + NAO
 // ALTERADO PARA > 21 
 // Alterado para > 23 por causa do item 44882503DPURSSBBP 04/10/2016  
  if (strlen(trim(removeLineBreaks(getVarValue("codigoMaterial")))) > 23) {
    return "Caixa";
  } else {

    return "Material";
  }
}

