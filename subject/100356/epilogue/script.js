const pages = [
    {
        characters: [],
        speaker: '',
        dialogue: '집 주변이 온갖 색색의 불빛과 사람들로 둘러싸여 소란스럽다.'
    },
    {
        characters: [],
        speaker: '',
        dialogue: '시끄럽다.'
    },
    {
        characters: [],
        speaker: '',
        dialogue: '왜 이렇게 많은 사람들이 모여있을까?'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '노나, 밖이 너무 시끄러워.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '노나는 대답하지 않는다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '......'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '나는 노나를 끌어안았다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '흉터처럼 단단하게 뭉친 솜을 가졌음에도 노나는 여전히 푹신하다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '온기는 느껴지지 않는다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '.............FIN'
    },
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