
(function() {
    "use strict";

    // pobieranie elementów
    var el = function(element) {
        if (element.charAt(0) === "#") {                // jeżeli przekazano identyfikator
            return document.querySelector(element);     // zwróć pjedyńczy element
        }
        return document.querySelectorAll(element);      // lub zwróć pozycję węzła
    };

    // deklaracja zmiennych
    var viewer = el("#viewer"),                         // ekran wyświetlania wyniku
        equals = el("#equals"),                         // button równości
        nums = el(".num"),                              // lista liczb
        ops = el(".ops"),                               // lista operatorów
        theNum = "",                                    // aktualna cyfra
        oldNum = "",                                    // pierwsza cyfra
        resultNum,                                      // wynik
        operator;

    //  wybranie cyfry jako bieżąca po kliknięciu jej
    var setNum = function() {
        if (resultNum) {                                // jeśli wyświetlony jest wynik to zresetuj cyfrę
            theNum = this.getAttribute("data-num");
            resultNum = "";
        } else {
            theNum += this.getAttribute("data-num");    // lub dopisz cyfrę do poprzedniej
        }
        viewer.innerHTML = theNum;
    };

    // przekazanie cyfry do poprzedniej po kliknięciu operatora
    var moveNum = function() {
        oldNum = theNum;
        theNum= "";
        operator = this.getAttribute("data-ops");

        equals.setAttribute("data-result", "");         // reset wyniku w attrybute
    };

    // po kliknięciu znaku równości, oblicz wynik
    var displayNum = function() {

        // konwertowanie ciągu znaków na liczby
        oldNum = parseFloat(oldNum);
        theNum = parseFloat(theNum);

        // wykonanie
        switch (operator) {
            case "+":
                resultNum = oldNum + theNum;
                break;

            case "-":
                resultNum = oldNum - theNum;
                break;

            case "*":
                resultNum = oldNum * theNum;
                break;

            case "/":
                resultNum = oldNum / theNum;
                break;

            // po wciśnięciu znaku równości bez operatora, zachowaj bieżący numer
            default:
                resultNum = theNum;
        }

        // jeżeli NaN lub  nieskończoność zwróć
        if (!isFinite(resultNum)) {
            if (isNaN(resultNum)) {
                resultNum = "Niepoprawne dane!";
            } else {                        // jeśli wynik jest nieskończonością
                resultNum = "Zły zakres";
                el('#calculator').classList.add("broken");      //zatrzymaj działanie kalkulatora
                el('#reset').classList.add("show");             // pokaż button resetowania
            }
        }

        // pokazanie wyniku
        viewer.innerHTML = resultNum;
        equals.setAttribute("data-result", resultNum);

        // resetowanie poprzednich liczb i zachowanie wyniku
        oldNum = 0;
        theNum = resultNum;
    };

    // czyszczenie  wyświetlania po kliknięciu przycisku clear
    var clearAll = function() {
        oldNum = "";
        theNum = "";
        viewer.innerHTML = "GO";
        equals.setAttribute("data-result", resultNum);
    };


    // dodanie zdarzenia kliknięcia do cyfr

    var i;
    var l;

    for (i=0, l = nums.length; i < l; i++) {
        nums[i].onclick = setNum;
    }

    // dodanie zdarzenia click do operatorów
    for (i=0, l = ops.length; i < l; i++) {
        ops[i].onclick = moveNum;
    }

    // zdarzenie click na znak równości
    equals.onclick = displayNum;

    // zdarzenie click na button clear
    el('#clear').onclick = clearAll;

    // zdarzenie click na button reset
    el("#reset").onclick = function() {
        window.location = window.location;
    };

}());
