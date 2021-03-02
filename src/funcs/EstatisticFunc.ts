import mathjs from 'mathjs';
/**install @types/mathjs
 * 
 * 1 2 3 4 5 6 7 8 9 10
 * Detratores => 8 - 6
 * Passivos => 7 - 8
 * Promotores => 9 - 10
 * 
 * (Numeros de promotores - numeros de detratores) / (numero de respondentes) x 100
 */

    function funcaoCalculoFr_Para_fi(fr: number, n: number) {
        return (fr * 100) / n;
    }

    //float funcaoCalculo_fi_para_alfa(float fi);//Função para encontrar o alpha pelo fi
    function funcaoCalculo_fi_para_alfa(fi: number)
    {
	    return (fi * 360) / 100;
    }

    function funcao_Para_FrAC(fr0: number ,fr1:number)
    {
	    return fr0 + fr1;
    }

    function funcao_Para_frAC(fr: number ,fr1: number)
    {
    	return fr + fr1;
    }

    function funcao_Para_K(Ninput: number)
    {
    	var Kinterno = (1 + 3.22) * mathjs.log10(Ninput);
    	return Kinterno;
    }

    function funcao_Para_At(Maior: number, Menor: number, K: number)
    {
    	return (Maior - Menor) / K;
    }

export { funcaoCalculoFr_Para_fi, funcaoCalculo_fi_para_alfa, funcao_Para_FrAC, funcao_Para_frAC, funcao_Para_K, funcao_Para_At}