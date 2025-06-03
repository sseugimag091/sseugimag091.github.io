// 페이지 데이터 정의 예시 (사용자 스크립트 기반)
const pages = [
    // 집 도착
    {
        characters: [{ src: '../static/character1.png' }], // 오늘 혼자 등장
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
        speaker: '', // 오늘의 생각/나레이션
        dialogue: '집 안이 썰렁하다. 부모님은 아직 퇴근하지 않으신 것 같다.'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '방으로 돌아가자.'
    },
    // 방 안
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '딱히 할 일이 없네. 숙제도 따로 없었고. 피곤하긴 한데 자고싶은건 아니야.'
    },
    {
        // 오늘이 노나에게 말을 걸기 시작하므로, 노나 등장
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '오늘',
        dialogue: '노나, 뭘 해야할까?'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '노나',
        dialogue: '…...' // 노나는 말이 없음
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '오늘',
        dialogue: '아, 그럼 오랜만에 게임이나 할까? 그러고보니 <이스>를 마지막으로 한게 언제였더라. 결말 내용도 까먹겠어.'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '노나',
        dialogue: '…...'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '오늘',
        dialogue: '게임 결말이 어땠더라… . 진짜로 기억이 안 나.'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '오늘', // 지문을 오늘의 행동/생각으로 표현
        dialogue: '(노나를 책상 앞에 내려놓는다.)'
    },
    {
        characters: [{ src: '../static/character1.png' }, { src: '../static/character2.png' }],
        speaker: '오늘',
        dialogue: '어쩔 수 없다. 우리 오늘은 <이스> 엔딩이나 다시 보는걸로 하자.'
    },
    {
        characters: [{ src: '../static/character1.png' }], // 오늘 혼자 컴퓨터를 보는 상황, 또는 노나와 함께
                                                        // 일단 오늘 혼자로 설정. 노나는 책상에 내려둔 상태로 해석.
                                                        // 만약 노나도 계속 화면에 있게 하려면 [{ src: '../static/character1.png' }, { src: '../static/character2.png' }]
        speaker: '???', // 나레이션 또는 오늘의 생각
        dialogue: '...와줘, 도와줘!' // "컴퓨터:" 부분은 제거하고 내용만 살림
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '이게 무슨 소리지?'
    },
    {
        characters: [{ src: '../static/character1.png' }],
        speaker: '오늘',
        dialogue: '…잠깐, 컴퓨터에 <이스>가 켜져 있잖아?'
    },
    {
        characters: [{ src: '../static/character1.png' }], // 오늘이 듣는 상황
        speaker: '???', // 컴퓨터에서 나는 정체불명의 목소리
        dialogue: '도와줘! 나 좀 꺼내줘!'
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
