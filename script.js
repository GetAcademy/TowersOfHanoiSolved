// model
//   hvor er diskene, 0 = venstre tårn, 1 = midten, 2 = høyre
//   alle starter til venstre
let smallDiskTowerIndex;
let mediumDiskTowerIndex;
let largeDiskTowerIndex;

// view 
restart();
function updateView() {
    const isSolved = smallDiskTowerIndex == 2
        && mediumDiskTowerIndex == 2
        && largeDiskTowerIndex == 2;

    document.getElementById('app').innerHTML = /*HTML*/`
                <h1>${isSolved ? 'Spillet er løst!' : ''}</h1>
                <button onclick="restart()">Restart</button>
                <div class="game-container">
                    <div class="tower-container">
                        <div class="tower">
                            ${createDisc('L', 0)}
                            ${createDisc('M', 0)}
                            ${createDisc('S', 0)}
                        </div>
                    </div>
                    <div class="tower-container">
                        <div class="tower">
                            ${createDisc('L', 1)}
                            ${createDisc('M', 1)}
                            ${createDisc('S', 1)}
                         </div>
                    </div>
                    <div class="tower-container">
                        <div class="tower">
                            ${createDisc('L', 2)}
                            ${createDisc('M', 2)}
                            ${createDisc('S', 2)}
                        </div>
                    </div>
                </div>
                Flytt liten disk til 
                <button onclick="moveSmallDisk(0, true)" ${moveSmallDisk(0, false)}>venstre tårn</button>
                <button onclick="moveSmallDisk(1, true)" ${moveSmallDisk(1, false)}>midtre tårn</button>
                <button onclick="moveSmallDisk(2, true)" ${moveSmallDisk(2, false)}>høyre tårn</button>
                <br/>
                Flytt medium disk
                <button onclick="moveMediumDisk(0, true)" ${moveMediumDisk(0, false)}>venstre tårn</button>
                <button onclick="moveMediumDisk(1, true)" ${moveMediumDisk(1, false)}>midtre tårn</button>
                <button onclick="moveMediumDisk(2, true)" ${moveMediumDisk(2, false)}>høyre tårn</button>
                <br/>
                Flytt stor disk
                <button onclick="moveLargeDisk(0,true)" ${moveLargeDisk(0, false)}>venstre tårn</button>
                <button onclick="moveLargeDisk(1,true)" ${moveLargeDisk(1, false)}>midtre tårn</button>
                <button onclick="moveLargeDisk(2,true)" ${moveLargeDisk(2, false)}>høyre tårn</button>
                <br/>
            `;
}

function createDisc(size, towerIndex) {
    const currentTowerIndexOfDisc =
        size == 'L' ? largeDiskTowerIndex :
            size == 'M' ? mediumDiskTowerIndex :
                smallDiskTowerIndex;
    const sizeNumber =
        size == 'L' ? 70 :
            size == 'M' ? 50 :
                30;
    return currentTowerIndexOfDisc == towerIndex ? `<div class="disk" style="width: ${sizeNumber}px"></div>` : '';
}

// function createMediumDisc(towerIndex) {
//     return mediumDiskTowerIndex == towerIndex ? '<div class="disk" style="width: 70px"></div>' : '';
// }


// function createDiscHtml2() {
//     return largeDiskTowerIndex == 1 ? '<div class="disk" style="width: 70px"></div>' : '';
// }

// function createDiscHtml1() {
//     return largeDiskTowerIndex == 0 ? '<div class="disk" style="width: 70px"></div>' : '';
// }

// controller
function restart() {
    smallDiskTowerIndex = 0;
    mediumDiskTowerIndex = 0;
    largeDiskTowerIndex = 0;
    updateView();
}

function moveSmallDisk(toTowerIndex, actuallyDoIt) {
    if (smallDiskTowerIndex == toTowerIndex) return 'disabled';
    if (actuallyDoIt) {
        smallDiskTowerIndex = toTowerIndex;
        updateView();
    }
    return '';
}

function moveMediumDisk(toTowerIndex, actuallyDoIt) {
    if (mediumDiskTowerIndex == toTowerIndex
        || mediumDiskTowerIndex == smallDiskTowerIndex
        || smallDiskTowerIndex == toTowerIndex
    ) return 'disabled';

    if (actuallyDoIt) {
        mediumDiskTowerIndex = toTowerIndex;
        updateView();
    }
    return '';
}

function moveLargeDisk(toTowerIndex, actuallyDoIt) {
    if (largeDiskTowerIndex == toTowerIndex
        || largeDiskTowerIndex == mediumDiskTowerIndex
        || largeDiskTowerIndex == smallDiskTowerIndex
        || smallDiskTowerIndex == toTowerIndex
        || mediumDiskTowerIndex == toTowerIndex
    ) return 'disabled';

    if (actuallyDoIt) {
        largeDiskTowerIndex = toTowerIndex;
        updateView();
    }

    return '';
}

document.body.innerHTML += `
            <h4>Oppgaver</h4>
            Disse oppgavene er ment å løses med kun funksjoner, variabler, operatorer, if-setninger og MVC. Man trenger
            ikke bruke løkker eller lister.
            <ol>
                <li>
                    Studer spillet her: <a href="https://www.mathsisfun.com/games/towerofhanoi.html">mathsisfun.com/games/towerofhanoi.html</a>
                    og sørg for at dere forstår reglene. 
                </li>
                <li>
                    Sørg for at <tt>updateView()</tt> tegner opp diskene ut fra innholdet av variablene i modellen.
                    Merk at pga <tt>display: flex</tt> og <tt>flex-direction: column-reverse</tt> må dere legge til 
                    diskene i motsatt rekkefølge av ellers. Den siste taggen inne i hvert tårn kommer øverst
                </li>
                <li>
                    Implementer aller enkleste versjon av controller-funksjonene, nemlig å flytte hver disk uten å sjekke om det er lov
                    eller ikke. Sjekk at det virker før dere går videre. 
                </li>
                <li>
                    Implementer så reglene. Du kan ikke flytte en disk til et tårn om det alt ligger en disk der som er mindre.                
                </li>
                <li>
                    Skjul alltid knappene som flytter en disk dit den allerede er. Skjul også knappene som er ulovlige å utføre.
                </li>
                <li>
                    Vis en melding på skjermen hvis spillet er løst, det vil si at alle diskene er på høyre tårn. Vis i det
                    tilfellet en knapp for å starte spillet på nytt. 
                </li>
            </ol>
        `;