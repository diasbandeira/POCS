import repository from './repository.js';

const connect = await repository.connectToAzureSQL(); 

export const handler = async (event) => {
  const query = repository.createQuery(event);
  const responseMessage = await repository.executeQuery(connect, query); 
  const records = responseMessage.length > 0 ? responseMessage.length : 0;

  const response = {
    statusCode: 200,
    body: responseMessage,
    records: records
  };
  return response;
};
