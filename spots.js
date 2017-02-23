module.exports.getCrudeList = getMarinhaList; 
module.exports.getByCode = getSpot; 

function getSpot (code) {

  var foundSpot = false; 
  var spots = getMarinhaList(); 

  for (var i = 0; i < spots.length; i++) {
    var thisSpot = spots[i];
    if (thisSpot.code === code) {
      foundSpot = thisSpot; 
      return foundSpot; 
    }
  };

  return foundSpot; 
}


function getMarinhaList() { return [      

    {code : "10650", name : "BARRA NORTE DO RIO AMAZONAS-PONTA DO CÉU (ESTADO DO AMAPÁ) - Previsões até 2011"},       
    {code : "10653", name : "BARRA NORTE DO RIO AMAZONAS-PONTA DO CÉU ESTADO DO AMAPÁ) "}, 
    {code : "10620", name : "PORTO DE SANTANA -ICOMI(ESTADO DO AMAPÁ) - Previsões até 2011 </font>"},      
    {code : "10615", name : "PORTO DE SANTANA -ICOMI(ESTADO DO AMAPÁ) "},


    {code : "20520", name : "FUNDEADOURO DE SALINÓPOLIS (ESTADO DO PARÁ) "},  
    {code : "20533", name : "ILHA DOS GUARÁS (ESTADO DO PARÁ) - Previsões até 2011"},     
    {code : "20535", name : "ILHA DOS GUARÁS (ESTADO DO PARÁ) "},  
    {code : "10525", name : "ILHA DO MOSQUEIRO (ESTADO DO PARÁ) "},
    {code : "10520", name : "PORTO DE BELÉM (ESTADO DO PARÁ) "},
    {code : "10566", name : "PORTO DE VILA DO CONDE (ESTADO DO PARÁ) "},
    {code : "10572", name : "ATRACADOURO DE BREVES (ESTADO DO PARÁ) "},


    {code : "30120", name : "SÃO LUÍS (ESTADO DO MARANHÃO) "},
    {code : "30149", name : "TERMINAL DA PONTA DA MADEIRA (ESTADO DO MARANHÃO) "},
    {code : "30110", name : "PORTO DE ITAQUI (ESTADO DO MARANHÃO) "},
    {code : "30114", name : "TERMINAL DA ALUMAR (ESTADO DO MARANHÃO) "},      
    {code : "30140", name : "PORTO DE TUTÓIA (ESTADO DO MARANHÃO) "},

    {code : "30225", name : "PORTO DE LUÍS CORREIA (ESTADO DO PIAUÍ) "},

    {code : "30337", name : "TERMINAL PORTUÁRIO DO PECÉM (ESTADO DO CEARÁ) "},     
    {code : "30340", name : "PORTO DE MUCURIPE (ESTADO DO CEARÁ) "},


    {code : "30407", name : "PORTO DE AREIA BRANCA - TERMISA (ESTADO DO RIO GRANDE DO NORTE) "},     
    {code : "30443", name : "PORTO DE GUAMARÉ (ESTADO DO RIO GRANDE DO NORTE) "},  
    {code : "30445", name : "PORTO DE MACAU (ESTADO DO RIO GRANDE DO NORTE) "},
    {code : "30955", name : "ILHA DE FERNANDO DE NORONHA - BAÍA DE SANTO ANTÔNIO (ESTADO DE PERNAMBUCO) "},
    {code : "30461", name : "PORTO DE NATAL (ESTADO DO RIO GRANDE DO NORTE) "},

    {code : "30540", name : "PORTO DE CABEDELO (ESTADO DA PARAÍBA) "},

    {code : "30645", name : "PORTO DO RECIFE (ESTADO DE PERNAMBUCO) "},      
    {code : "30685", name : "PORTO DE SUAPE (ESTADO DE PERNAMBUCO) "},

    {code : "30725", name : "PORTO DE MACEIÓ (ESTADO DE ALAGOAS) "},

    {code : "30810", name : "TERMINAL MARÍTIMO INÁCIO BARBOSA (ESTADO DE SERGIPE) "},
    {code : "30825", name : "CAPITANIA DOS PORTOS DE SERGIPE "},

    {code : "40118", name : "PORTO DE MADRE DE DEUS (ESTADO DA BAHIA) "}, 
    {code : "40135", name : "PORTO DE ARATU - BASE NAVAL (ESTADO DA BAHIA) "},     
    {code : "40140", name : "PORTO DE SALVADOR (ESTADO DA BAHIA) "},
    {code : "40145", name : "PORTO DE ILHÉUS - MALHADO (ESTADO DA BAHIA) "},
    {code : "40240", name : "TERMINAL DE BARRA DO RIACHO (ESTADO DO ESPÍRITO SANTO) "},
    {code : "40250", name : "PORTO DE VITÓRIA (ESTADO DO ESPÍRITO SANTO) - Previsões até 2010"},
    {code : "40252", name : "PORTO DE VITÓRIA (ESTADO DO ESPÍRITO SANTO) "},
    {code : "40255", name : "PORTO DE TUBARÃO (ESTADO DO ESPÍRITO SANTO) "},
    {code : "40280", name : "TERMINAL DA PONTA DO UBU (ESTADO DO ESPÍRITO SANTO) "},

    {code : "40263", name : "ILHA DA TRINDADE (BRASIL) "},
    {code : "50116", name : "TERMINAL MARÍTIMO DE IMBETIBA (ESTADO DO RIO DE JANEIRO) "},
    {code : "50156", name : "PORTO DO FORNO (ESTADO DO RIO DE JANEIRO) "},
    {code : "50140", name : "PORTO DO RIO DE JANEIRO - ILHA FISCAL (ESTADO DO RIO DE JANEIRO) "},
    {code : "50145", name : "PORTO DE ITAGUAÍ (ESTADO DO RIO DE JANEIRO) "},
    {code : "50165", name : "TERMINAL DA ILHA GUAÍBA (ESTADO DO RIO DE JANEIRO) "},
    {code : "50170", name : "PORTO DE ANGRA DOS REIS (ESTADO DO RIO DE JANEIRO) "},

    {code : "50210", name : "PORTO DE SÃO SEBASTIÃO (ESTADO DE SÃO PAULO) "},
    {code : "50225", name : "PORTO DE SANTOS - TORRE GRANDE (ESTADO DE SÃO PAULO) "},

    {code : "60130", name : "BARRA DE PARANAGUÁ - CANAL SUESTE (ESTADO DO PARANÁ) "},     
    {code : "60135", name : "BARRA DE PARANAGUÁ - CANAL DA GALHETA (ESTADO DO PARANÁ) "},
    {code : "60132", name : "PORTO DE PARANAGUÁ - CAIS OESTE (ESTADO DO PARANÁ) "},
    {code : "60139", name : "TERMINAL PORTUÁRIO DA PONTA DO FÉLIX (ESTADO DO PARANÁ) "},

    {code : "60220", name : "PORTO DE SÃO FRANCISCO DO SUL - DELEGACIA DA CPSFS (ESTADO DE SANTA CATARINA) "},     
    {code : "60230", name : "PORTO DE ITAJAÍ (ESTADO DE SANTA CATARINA) - Previsões até 2011 </font>"},
    {code : "60235", name : "PORTO DE ITAJAÍ (ESTADO DE SANTA CATARINA) "},
    {code : "60245", name : "PORTO DE FLORIANÓPOLIS (ESTADO DE SANTA CATARINA) "},      
    {code : "60250", name : "PORTO DE IMBITUBA (ESTADO DE SANTA CATARINA) "},

    {code : "60370", name : "PORTO DO RIO GRANDE (ESTADO DO RIO GRANDE DO SUL) "},

    {code : "60900", name : "ESTAÇÃO ANTÁRTICA COMANDANTE FERRAZ "}

]}