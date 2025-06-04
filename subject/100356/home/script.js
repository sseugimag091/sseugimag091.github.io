const pages = [
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '다녀왔습니다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '…아무도 없나보다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '집 안이 썰렁하다. 부모님은 아직 퇴근하지 않으신 것 같다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '방으로 돌아가자.'
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

loadPage(currentPageIndex);
