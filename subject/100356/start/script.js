const pages = [
    {
        characters: [{ src: '../static/character1.png' }], // 오늘이 혼자 등장하여 독백 시작
        speaker: '',
        dialogue: '<이스>는 협동형 퍼즐 게임으로, 감옥에서 탈출해야 하는 인형들의 이야기를 다루고 있다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '플레이어는 인형이 되어, 다른 인형을 데리고 게임의 기믹을 수행하게 된다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '이때, 플레이어와 필수적으로 동행하게 되는 인형 캐릭터가 있다.'
    },
    {
        characters: [{ src: '../static/character2.png' }],
        speaker: '',
        dialogue: '그의 이름은 \'노나\'' // 작은따옴표는 이스케이프 처리
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: 'images/character2.png' }], // 오늘과 노나 인형이 함께 있는 상태
        speaker: '',
        dialogue: '인형 노나는 플레이어의 뒤를 천천히 따라오고, 플레이어는 노나의 속도에 맞추어 퍼즐을 풀어야한다.'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: 'images/character2.png' }],
        speaker: '',
        dialogue: '두 인형은 마치 한 몸처럼 움직인다. 노나는 플레이어가 가는 곳에 반드시 따라가고 플레이어는 노나 없이 게임을 진행할 수 없다.'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: 'images/character2.png' }], // 오늘과 노나 인형
        speaker: '오늘',
        dialogue: '......'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: 'images/character2.png' }],
        speaker: '',
        dialogue: '나는 고개를 숙인 채 인형을 끌어안았다.'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: 'images/character2.png' }],
        speaker: '',
        dialogue: '흉터처럼 단단하게 뭉친 솜을 가졌음에도 노나는 여전히 푹신하다.'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: 'images/character2.png' }],
        speaker: '',
        dialogue: '... 내 삶은 어느 순간부터 마치 <이스> 같아져서\n노나 없이는 아무것도 할 수 없게되었다.'
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

loadPage(currentPageIndex);
