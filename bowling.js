const STRIKE = 10
const SPARE = 10

// 最終フレームかどうかを判定する
const isLastFrame = (frame) => {
  return frame.third !== undefined
}

// 引数に渡したフレームがストライクかどうか判定する
// 最終フレームは1投目がストライクで2投目がストライクだったとしても
// 点数計算に影響がないので加味しなくて良い
const isStrike = (frame) => {
  return frame.first === STRIKE
}

// 引数に渡したフレームがスペアかどうか判定する
// 最終フレームは1投目がストライクで2投目と3投目でスペアだったとしても
// 点数計算に影響がないので加味しなくて良い
const isSpare = (frame) => {
  return frame.first !== STRIKE && (frame.first + frame.second === SPARE)
}

// ボーナスを加味せず、倒したピンの合計値を返却する
const getTotalPinScore = (scoreSheet) => {
  // 倒したピンだけの数字が並んだ配列にする
  const pinScores = scoreSheet.map(frame => {
    if (isLastFrame(frame)) {
      return frame.first + frame.second + frame.third
    }
    return frame.first + frame.second
  }).flat()

  // ピンの合計値を返却する
  return pinScores.reduce((acc, current) => acc + current)
}

// 倒したピンの点数を加味せず、ボーナスの合計値を返却する
const getTotalBonusScore = (scoreSheet) => {
  const bonusScores = scoreSheet.map((frame, index, array) => {
    // 最終フレームはボーナス計算に影響がないので計算しない
    if (isLastFrame(frame)) {
      return 0
    }

    const nextFrame = array[index + 1]

    if (isSpare(frame)) {
      return nextFrame.first
    }

    if (isStrike(frame)) {
      if (isStrike(nextFrame) && isLastFrame(nextFrame)) {
        return nextFrame.first + nextFrame.second
      }

      if (isStrike(nextFrame)) {
        return nextFrame.first + array[index + 2].first
      }
      return nextFrame.first + nextFrame.second
    }

    // ボーナスなしの場合
    return 0
  })

  return bonusScores.reduce((acc, current) => acc + current)
}

// 引数に渡したscoreSheetの点数を計算する
const printTotalScore = (scoreSheet, expected) => {
  const totalPinScore = getTotalPinScore(scoreSheet)
  const totalBonusScore = getTotalBonusScore(scoreSheet)
  const totalScore = totalPinScore + totalBonusScore

  console.log('★★結果発表★★')
  console.log(`倒したピンのトータルは${totalPinScore}です。`)
  console.log(`ボーナスのトータルは${totalBonusScore}です。`)
  console.log(`合計得点は${totalScore}です。`)
  console.log(totalScore === expected ? '予想通りです。' : '間違いです。')
  totalScore !== expected && console.log(`予想から実際の点数を引くと、${totalScore - expected}点です。`)
  console.log('          ')
}

const scoreSheetSampleFirst = [
  {
    first: 4,
    second: 3,
  },
  {
    first: 6,
    second: 4,
  },
  {
    first: 3,
    second: 7,
  },
  {
    first: 10,
    second: 0,
  },
  {
    first: 8,
    second: 2,
  },
  {
    first: 9,
    second: 0,
  },
  {
    first: 5,
    second: 5,
  },
  {
    first: 0,
    second: 0,
  },
  {
    first: 0,
    second: 0,
  },
  {
    first: 6,
    second: 4,
    third: 10,
  },
];

const scoreSheetSampleSecond = [
  {
    first: 6,
    second: 4,
  },
  {
    first: 8,
    second: 0,
  },
  {
    first: 10,
    second: 0,
  },
  {
    first: 2,
    second: 7,
  },
  {
    first: 5,
    second: 5,
  },
  {
    first: 3,
    second: 4,
  },
  {
    first: 10,
    second: 0,
  },
  {
    first: 9,
    second: 1,
  },
  {
    first: 1,
    second: 2,
  },
  {
    first: 7,
    second: 1,
    third: 0,
  },
];

const scoreSheetSampleThird = [
  {
    first: 10,
    second: 0,
  },
  {
    first: 10,
    second: 0,
  },
  {
    first: 10,
    second: 0,
  },
  {
    first: 10,
    second: 0,
  },
  {
    first: 10,
    second: 0,
  },
  {
    first: 10,
    second: 0,
  },
  {
    first: 10,
    second: 0,
  },
  {
    first: 10,
    second: 0,
  },
  {
    first: 10,
    second: 0,
  },
  {
    first: 10,
    second: 10,
    third: 10,
  },
];

// 点数を出力する
printTotalScore(scoreSheetSampleFirst, 118)
printTotalScore(scoreSheetSampleSecond, 116)
printTotalScore(scoreSheetSampleThird, 300)