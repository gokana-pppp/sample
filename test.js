const scoreSheet = [
    // 1フレーム目
    {
      first: 4,
      second: 3,
    },
    // 2フレーム目
    {
      first: 6,
      second: 4,
    },
    // 3フレーム目
    {
      first: 3,
      second: 7,
    },
    // 4フレーム目
    {
      first: 10,
      second: 0,
    },
    // 5フレーム目
    {
      first: 8,
      second: 2,
    },
    // 6フレーム目
    {
      first: 9,
      second: 0,
    },
    // 7フレーム目
    {
      first: 5,
      second: 5,
    },
    // 8フレーム目
    {
      first: 0,
      second: 0,
    },
    // 9フレーム目
    {
      first: 0,
      second: 0,
    },
    // 10フレーム目
    {
      first: 6,
      second: 4,
      third: 10,
    },
  ];
  
  // プログラムを書く
  let totalScore = 0
  
  for (let i = 0; i < scoreSheet.length; i++) {
    const isTurkey = scoreSheet[i].first === 10 && scoreSheet[i+1].first === 10 && scoreSheet[i+2].first === 10
    const isDouble = scoreSheet[i].first === 10 && scoreSheet[i+1].first === 10
    const isStrike = scoreSheet[i].first === 10 
    const isLastFrame = scoreSheet[i].third !== undefined
    const isSpare = scoreSheet[i].first !== 10 && scoreSheet[i].first + scoreSheet[i].second === 10 
    
    if (isTurkey) {
      // ターキーの時
      const frameTotalScore = 30
      totalScore += frameTotalScore
  
    } else if (isDouble) {
      // ダブルの時
      const frameTotalScore = 20 + scoreSheet[i+2].first
      totalScore += frameTotalScore
  
    } else if (isStrike) {
      // ストライクの時
      const frameTotalScore = 10 + scoreSheet[i+1].first + scoreSheet[i+1].second
      totalScore += frameTotalScore
  
    } else if (isLastFrame) {
      // 最終フレームの時
      const frameTotalScore = scoreSheet[i].first + scoreSheet[i].second + scoreSheet[i].third
      totalScore += frameTotalScore
  
    } else if (isSpare) {
      // スペアの時
      const frameTotalScore = 10 + scoreSheet[i+1].first
      totalScore += frameTotalScore
  
    } else {
      // それ以外の時
      const frameTotalScore = scoreSheet[i].first + scoreSheet[i].second
      totalScore += frameTotalScore
    } 
  }
  
  console.log(totalScore);