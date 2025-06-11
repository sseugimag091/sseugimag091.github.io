const pages = [
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '현관문을 열자마자 상쾌한 공기가 끼쳐온다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '밖이다! 나오는 데 성공했어!'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '노나, 이걸로 된 거지?'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '.....'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '노나?'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '뒤를 돌아보았지만, 더 이상 노나의 모습은 보이지 않는다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '노나? 어디있어?'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '챙그랑-'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '그때, 손에 들고 있던 무언가 바닥으로 떨어진다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '응?'
    },
    {
        characters: [{ src: '../static/knife.png' }],
        speaker: '',
        dialogue: '(피 묻은 칼 사진)'
    },
    {
        characters: [{ src: '../static/knife.png' }],
        speaker: '',
        dialogue: '발치에 피 묻은 칼이 떨어져 있다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '….어라?'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '내가 왜 이런 걸 들고 있었던거지?'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '나는 당황스러움에 주춤거리며 물러섰다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '하지만 얼마 지나지 않아 발치에 무언가 채인다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '.....'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '삐걱이며 돌린 시야 끝에는 피투성이의 소년이 쓰러져있다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '소년의 주위로는 붉은 핏물이 웅덩이를 이루고 있다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '온 사방에 핏자국이 선명하다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '......'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '나는 무의식적으로 양손을 내려다보았다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '(피묻은 손)'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '',
        dialogue: '손이 붉다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '......'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '하하.'
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