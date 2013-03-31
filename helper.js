exports.Ru2En = function(str) {  

    function in_array(needle, haystack, strict) {  
        var found = false, key, strict = !!strict;  
        for (key in haystack) {  
            if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {  
                found = true;  
                break;  
            }  
        }  
        return found;  
    }
    
    function array_search( needle, haystack, strict ) {  
        var strict = !!strict;  
        for(var key in haystack){  
            if( (strict && haystack[key] === needle) || (!strict && haystack[key] == needle) ){  
                return key;  
            }  
        }  
        return false;  
    }

    var en = Array('q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m');  
    var EN = Array('Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M');  
    var ru = Array('й','ц','у','к','е','н','г','ш','щ','з','х','ъ','ф','ы','в','а','п','р','о','л','д','ж','э','я','ч','с','м','и','т','ь','б','ю');  
    var RU = Array('Й','Ц','У','К','Е','Н','Г','Ш','Щ','З','Х','Ъ','Ф','Ы','В','А','П','Р','О','Л','Д','Ж','Э','Я','Ч','С','М','И','Т','Ь','Б','Ю');  
    var ru2en = Array('y','c','u','k','e','n','g','sh','sh','z','h','','f','u','v','a','p','r','o','l','d','zgh','e','ya','ch','s','m','i','t','','b','u');  
    var RU2EN = Array('Y','C','U','K','E','N','G','Sh','Sh','Z','H','','F','U','V','A','P','R','O','L','D','Zgh','E','YA','CH','S','M','I','T','','B','U');  
    var digits = Array('0','1','2','3','4','5','6','7','8','9');  
    var ret = '';  
 
    for (var i=0; i<str.length; i++) {  
        var ch = str.charAt(i);  
        var key=false;  
     if (!in_array(ch, en) && !in_array(ch, EN) && !in_array(ch, digits)) {  
         if ((key=array_search(ch, ru))!==false) {ret += ru2en[key];}  
         else if ((key=array_search(ch, RU))!==false) ret += RU2EN[key];  
         else ret += '_';  
 
     } else ret+=ch;  
 
    }  
    return ret;  
}