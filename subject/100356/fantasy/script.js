const pages = [
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '!!!!'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '자각하지 못한 사이 참고 있던 숨이 터져 나온다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '헉, 허억…'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '여긴 어디야…?'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '처음 보는 공간이다. 누군가의 방인가?\n기묘한 익숙함이 느껴진다.\n하지만 주위를 더 둘러볼 새도 없이 아까부터 들려오던 목소리가 정신을 일깨운다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '???',
        dialogue: '늘아! 와줬구나! 역시 날 구하러 와준 거야!'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '응…?'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '???',
        dialogue: '여기야, 여기! 아래를 봐!'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '(목소리를 따라 시야를 내린다)'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '???',
        dialogue: '나야, 나! 내가 누군지 알아보겠어?'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '너는… 노나?'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '',
        dialogue: '하얀 고양이 인형이 격하게 고개를 끄덕인다.'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '노나',
        dialogue: '맞아! 역시 바로 알아봐 줄 거라고 생각했어!'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '오늘',
        dialogue: '노나가… 남자였어?'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '노나',
        dialogue: '그건 별로 중요하지 않아!'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '노나',
        dialogue: '아무튼, 네가 날 구하러 와 줘서 정말 다행이야. 이 감옥 안은 너무 외롭고 쓸쓸하거든.'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '노나',
        dialogue: '날 데리고 감옥에서 탈출해 줘, 늘아! 너만이 가능한 일이야!'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '노나',
        dialogue: '이곳은 여러 가지 방들이 미로처럼 얽혀있어. 방들 곳곳을 조사하다 보면 문을 열 수 있는 단서를 찾을 수 있을 거야.'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '노나',
        dialogue: '보다시피 나는 몸이 너무 작아서 방을 탐사하기 쉽지 않아. 하지만 중간중간 내가 도움을 줄 수 있는 부분이 있을 거야. 난 널 계속 따라다닐 테니, 너는 이곳을 탈출할 단서를 모아줘!'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '오늘',
        dialogue: '일단… 알겠어.'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '노나',
        dialogue: '비밀번호가 없는 문은 다른 방법으로 열 수 있을거야. 너라면 잘 알겠지?'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '노나',
        dialogue: '그러면, 잘 부탁할게!'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '오늘',
        dialogue: '응,나도 잘 부탁해.'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '',
        dialogue: '말을 할 수 있는 노나를 만나게 될 줄이야.'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '',
        dialogue: '그렇다면, 나는 <이스>안으로 들어온 걸까?'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '',
        dialogue: '하지만… <이스>에 이런 맵이 있었던가?'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '',
        dialogue: '잘 모르겠다.'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '',
        dialogue: '게임을 안 한 지 너무 오래되어서 기억이 잘 나지 않는다.'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '오늘',
        dialogue: '모르겠어. 일단은 노나와 함께 이 감옥에서 탈출하고 생각해보자.'
    }
];

let currentPageIndex = 0;
let typingTimeout;
let previousCharacterCount = -1;

const gameContainerElement = document.getElementById('game-container');
const characterAreaElement = document.getElementById('character-area');
const speakerNameElement = document.getElementById('speaker-name');
const dialogueTextElement = document.getElementById('dialogue-text');

const CHARACTER_FADE_TIME = 300;

function typeDialogue(text, element, speed) {
    clearTimeout(typingTimeout);
    element.textContent = '';
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            typingTimeout = setTimeout(typing, speed);
        }
    }
    typing();
}

function loadPage(index) {
    const pageData = pages[index];
    const newCharacterCount = pageData.characters ? pageData.characters.length : 0;

    let applyTransition = true;
    if (newCharacterCount === previousCharacterCount) {
        applyTransition = false;
    }

    const fadeOutDelay = applyTransition && characterAreaElement.children.length > 0 ? CHARACTER_FADE_TIME : 0;

    if (applyTransition && characterAreaElement.children.length > 0) {
        Array.from(characterAreaElement.children).forEach(img => {
            img.style.opacity = '0';
        });
    }

    setTimeout(() => {
        characterAreaElement.innerHTML = '';

        // 캐릭터는 1명 또는 2명일 때만 생성 및 표시
        if (pageData.characters && (newCharacterCount === 1 || newCharacterCount === 2)) {
            pageData.characters.forEach((charData, i) => {
                // 2명까지만 처리하므로 i는 0 또는 1
                if (i >= 2 && newCharacterCount > 2) return; // 3번째 캐릭터부터는 무시 (안전장치)

                const imgElement = document.createElement('img');
                imgElement.src = charData.src;
                imgElement.alt = charData.speaker || "character";
                imgElement.className = 'character-img';

                if (newCharacterCount === 1) { // i는 항상 0
                    imgElement.classList.add('pos-1-center');
                } else if (newCharacterCount === 2) {
                    if (i === 0) {
                        imgElement.classList.add('pos-2-left');
                    } else { // i === 1
                        imgElement.classList.add('pos-2-right');
                    }
                }

                if (applyTransition) {
                    imgElement.style.opacity = '0';
                } else {
                    imgElement.style.opacity = '1';
                }
                characterAreaElement.appendChild(imgElement);

                if (applyTransition) {
                    requestAnimationFrame(() => {
                        imgElement.style.opacity = '1';
                    });
                }
            });
        }
        // 0명이거나 3명 이상인 경우, 캐릭터 영역은 비워짐

        if (pageData.speaker) {
            speakerNameElement.textContent = pageData.speaker;
            speakerNameElement.style.display = 'block';
        } else {
            speakerNameElement.style.display = 'none';
        }
        typeDialogue(pageData.dialogue, dialogueTextElement, 40);

    }, fadeOutDelay);

    previousCharacterCount = newCharacterCount;
}

function nextPage() {
    const currentDialogueText = dialogueTextElement.textContent;
    const currentPageData = pages[currentPageIndex];
    const fullDialogueText = currentPageData ? currentPageData.dialogue : "";

    // 1. 타이핑 중인지 확인
    if (typingTimeout && currentDialogueText.length < fullDialogueText.length) {
        // 타이핑 중이면, 타이핑 중단하고 전체 텍스트 즉시 표시
        clearTimeout(typingTimeout);
        dialogueTextElement.textContent = fullDialogueText;
        return;
    }

    if (currentPageIndex >= pages.length - 1) {
        return;
    }

    // 3. 마지막 페이지가 아니라면 다음 페이지로 이동합니다.
    currentPageIndex++;
    loadPage(currentPageIndex);
}

gameContainerElement.addEventListener('click', nextPage);
window.addEventListener('keydown', nextPage);

loadPage(currentPageIndex);
