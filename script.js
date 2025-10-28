// 正確答案 
        const correctAnswers = {
            q1: 'B',
            q2: 'A',
            q3: 'C',
            q4: 'B',
            q5: 'B',
            q6: 'A' 
        };

        /**
         * 提交測驗並計算分數，同時顯示正確答案
         */
        function submitQuiz() {
            const form = document.getElementById('quiz-form');
            const submitButton = document.getElementById('submit-quiz-button');
            submitButton.disabled = true; // 提交後禁用按鈕
            submitButton.textContent = '已提交，請查看結果'; // 改變按鈕文字

            let score = 0;
            const totalQuestions = Object.keys(correctAnswers).length;
            // 每個問題分數約 16.67 分
            const pointsPerQuestion = 100 / totalQuestions;
            
            let correctCount = 0;

            // 遍歷所有問題
            for (const q in correctAnswers) {
                const correctValue = correctAnswers[q];
                // 找出該問題的整個容器
                const questionDiv = form.querySelector(`div.quiz-question:has(input[name="${q}"])`);
                // 找出使用者選擇的答案
                const selectedInput = form.querySelector(`input[name="${q}"]:checked`);
                
                let isCorrect = false;

                if (selectedInput) {
                    // 禁用所有輸入
                    questionDiv.querySelectorAll('input').forEach(input => input.disabled = true);
                    
                    // 檢查答案是否正確
                    if (selectedInput.value === correctValue) {
                        score += pointsPerQuestion;
                        isCorrect = true;
                        correctCount++;
                        // 正確：將使用者選擇的選項標註為綠色 (user-correct)
                        selectedInput.parentElement.classList.add('user-correct');
                    } else {
                        // 錯誤：將使用者選擇的選項標註為紅色 (user-incorrect)
                        selectedInput.parentElement.classList.add('user-incorrect');
                        
                        // 揭示正確答案 (correct-answer-reveal)
                        const correctInput = form.querySelector(`input[name="${q}"][value="${correctValue}"]`);
                        if (correctInput) {
                            correctInput.parentElement.classList.add('correct-answer-reveal');
                        }
                    }
                } else {
                    // 未作答：直接揭示正確答案
                    const correctInput = form.querySelector(`input[name="${q}"][value="${correctValue}"]`);
                    if (correctInput) {
                        correctInput.parentElement.classList.add('correct-answer-reveal');
                    }
                    questionDiv.querySelectorAll('input').forEach(input => input.disabled = true);
                }

                // 套用整個問題容器的結果樣式
                questionDiv.classList.add(isCorrect ? 'correct' : 'incorrect');
            }

            // 格式化分數，確保四捨五入到整數
            score = Math.round(score);

            // 根據分數給予不同訊息
            let title = '測驗結果';
            let message = '';
            let color = 'text-primary';

            if (score >= 99) { // 由於除不盡，100分可能為99分，故 >= 99 視為滿分
                title = '★★ 滿分通過！★★';
                message = '太棒了！您已完全掌握產品的核心知識與所有安全規範，可以上線服務顧客了！';
                color = 'text-green-600';
            } else if (score >= 60) {
                title = '合格過關！';
                message = `您的分數是 ${score} 分。仍有 ${totalQuestions - correctCount} 題錯誤，請查看上方標註的正確答案，並建議複習第 4 點和第 5 點的使用規範。`;
                color = 'text-yellow-600';
            } else {
                title = '需要加強！';
                message = `您的分數是 ${score} 分。請仔細閱讀第 1-5 點的產品核心內容、使用指南和禁忌，加強學習後再試一次。`;
                color = 'text-red-600';
            }

            // 顯示結果 Modal
            const modal = document.getElementById('result-modal');
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-title').className = `text-2xl font-bold mb-3 ${color}`;
            document.getElementById('modal-score').textContent = `${score} / 100`;
            document.getElementById('modal-message').textContent = message;
            modal.style.display = 'flex';
        }

        /**
         * 關閉結果 Modal
         */
        function closeModal() {
            document.getElementById('result-modal').style.display = 'none';
        }


        /**
         * 切換情境演練卡片的內容顯示/隱藏
         * @param {number} id - 情境的編號 (1, 2, 3...)
         */
        function toggleScenario(id) {
            const content = document.getElementById(`scenario-content-${id}`);
            const button = content.previousElementSibling;
            const icon = button.querySelector('span:last-child');
            
            if (content.classList.contains('hidden')) {
                // 顯示內容
                content.classList.remove('hidden');
                icon.textContent = '–'; // 改變圖標為減號
                button.classList.add('bg-gray-200');
            } else {
                // 隱藏內容
                content.classList.add('hidden');
                icon.textContent = '+'; // 改變圖標為加號
                button.classList.remove('bg-gray-200');
            }
        }