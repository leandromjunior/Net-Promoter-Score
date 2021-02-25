import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async(): Promise<Connection> =>{
    const defaultOptions = await getConnectionOptions(); //Pegando informações que estão dentro do ormconfig
    
    return createConnection(
        Object.assign(defaultOptions, { //altera a variavel database que esta dentro de ormconfig
            database: 
                process.env.NODE_ENV === "test" ? "./src/database/database.test.sqlite" : defaultOptions.database,
        })
    );
};

// createConnection(); //Rodar o BD