const sql = require('mssql');

const repository = (function (){
    /**
     * @param {*}
     * @returns
     */
    async function connectToAzureSQL(){
        try{
            const config = {
                user: process.env.USER_DB,
                password: process.env.PASSWORD_DB,
                server: process.env.SERVER_DB,
                database: process.env.DATABASE_DB,
                options: {
                    encrypt: true,
                    enableArithAbort: true,
                    trustServerCertificate: false
                }
            }
            
            // const config = {
            //     user: 'adm.azure',
            //     password: 'qwe123!@#',
            //     server: 'primebuildersqldb.database.windows.net',
            //     database: 'ALGAR',
            //     options: {
            //         encrypt: true,
            //         enableArithAbort: true,
            //         trustServerCertificate: false
            //     }
            // }

            return await sql.connect(config);


        }catch(err){
            console.error('Erro ao conectar a base de dados: ', err);
            return false;

        }

    };

    /**
     * 
     * @param {*} promotor 
     * @returns executa a consulta
     */
    async function executeQuery (connect, select) {
        try{
            if(!connect && !connect.connected){
                return 'Não foi possivel conectar ao banco.';
            }

            const result = await connect.request().query(select);
            const records = result.recordset;
            
            return records;
            
    
        }catch(err){
            
            console.error('Não foi possivel executar a query ' + err);
            return err;
        }    
    };

    function createQuery (event){
        const {AREA, SQUAD, PARCEIRO, SUBPARCEIRO, CIDADE, UF,TIPO_ATIVIDADE, HORARIO_ATENDIMENTO, PERFIL, CLT, STATUS} = event;

        let query = `SELECT 
            [ID]
            ,[AREA]
            ,[SQUAD]
            ,[PARCEIRO]
            ,[SUBPARCEIRO]
            ,[UF]
            ,[CIDADE]
            ,[TIPO_ATIVIDADE]
            ,[SUBATIVIDADE]
            ,[HORARIO_ATENDIMENTO]
            ,[PERFIL]
            ,[VALOR_ATENDIMENTO_SOLICITANTE]
            ,[VALOR_CONTRATADO_SOLICITANTE]
            ,[SLA]
            ,[CLT]
            ,[PERCENT_TIME_ADM]
            ,[STATUS]
        FROM 
        [dbo].[CATALOGO_SCC] 
        WHERE [ID] is not null`;

        if (AREA !== "" && AREA !== undefined) {
            query += ` and [AREA] LIKE '${AREA}'`;
        }
        
        if (SQUAD !== "" && SQUAD !== undefined) {
            query += ` and [SQUAD] LIKE '${SQUAD}'`;
        }
        
        if (PARCEIRO !== "" && PARCEIRO !== undefined) {
            query += ` and [PARCEIRO] LIKE '${PARCEIRO}'`;
        }
        
        if (SUBPARCEIRO !== "" && SUBPARCEIRO !== undefined) {
            query += ` and [SUBPARCEIRO] LIKE '${SUBPARCEIRO}'`;
        }
        
        if (CIDADE !== "" && CIDADE !== undefined) {
            query += ` and [CIDADE] LIKE '${CIDADE}'`;
        }
        
        if (UF !== "" && UF !== undefined) {
            query += ` and [UF] LIKE '${UF}'`;
        }
        
        if (TIPO_ATIVIDADE !== "" && TIPO_ATIVIDADE !== undefined) {
            query += ` and [TIPO_ATIVIDADE] LIKE '${TIPO_ATIVIDADE}'`;
        }
        
        if (HORARIO_ATENDIMENTO !== "" && HORARIO_ATENDIMENTO !== undefined) {
            query += ` and [HORARIO_ATENDIMENTO] LIKE '${HORARIO_ATENDIMENTO}'`;
        }
        
        if (PERFIL !== "" && PERFIL !== undefined) {
            query += ` and [PERFIL] LIKE '${PERFIL}'`;
        }
        
        if (CLT !== "" && CLT !== undefined) {
            query += ` and [CLT] LIKE '${CLT}'`;
        }
        
        if (STATUS !== "" && STATUS !== undefined) {
            query += ` and [STATUS] LIKE '${STATUS}'`;
        }               
        
        return query;
    }

    return {
        'connectToAzureSQL': connectToAzureSQL,
        'createQuery': createQuery,
        'executeQuery': executeQuery
    }
})();
module.exports = repository;
//export default repository;