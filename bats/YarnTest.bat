echo "Apagando DB TESTE"
del D:\PROGRAMACAO\nlwNode1\src\database\database.test.sqlite

echo "DB apagado, começando yarn test"
yarn test

echo "Teste Finalizado"