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
  
    const isTurkey = () => {
      for (let i = 0; i < scoreSheet.length; i++) {
       return scoreSheet[i].first === 10 && scoreSheet[i+1].first === 10 && scoreSheet[i+2].first === 10
    }}
  
    const isDouble = () => {
      for (let i = 0; i < scoreSheet.length; i++) {
       return scoreSheet[i].first === 10 && scoreSheet[i+1].first === 10
    }}

    const isStrike = (frame) => { 
      return frame.first === 10 
    }
    const isLastFrame = (frame) => {
      return frame.third !== undefined
    }
    const isSpare = (frame) => {
      return frame.first !== 10 && frame.first + frame.second === 10 
    }
   
    scoreSheet.forEach (frame => { 

    if (isTurkey()) {
      // ターキーの時
      const frameTotalScore = 30
      totalScore += frameTotalScore
  
    } else if (isDouble()) {
      // ダブルの時
      const frameTotalScore = 20 + frame.first
      totalScore += frameTotalScore
  
    } else if (isStrike(frame)) {
      // ストライクの時
      const frameTotalScore = 10 + frame.first + frame.second
      totalScore += frameTotalScore
  
    } else if (isLastFrame(frame)) {
      // 最終フレームの時
      const frameTotalScore = frame.first + frame.second + frame.third
      totalScore += frameTotalScore
  
    } else if (isSpare(frame)) {
      // スペアの時
      const frameTotalScore = 10 + frame.first
      totalScore += frameTotalScore
  
    } else {
      // それ以外の時
      const frameTotalScore = frame.first + frame.second
      totalScore += frameTotalScore
    } })

  
  console.log(totalScore);