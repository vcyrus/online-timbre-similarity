const crypto = require('crypto');
const fs = require('fs');

function makeSpecHash() {
    const date = new Date();
    const random = Math.random();
    const hash = crypto
        .createHash('md5')
        .update(date.toString() + random.toString())
        .digest('hex');
    return hash;
}

function makePracticeTrials() {
    const practiceTrials = [
        {
            audio_src_a: '22.wav',
            audio_src_b: '23.wav'
        },
        {
            audio_src_a: '23.wav',
            audio_src_b: '24.wav'
        },
        {
            audio_src_a: '22.wav',
            audio_src_b: '24.wav'
        }
    ];
    return practiceTrials;
}

function listAudioFiles() {
    const files = fs.readdirSync('client/audio');
    for (const file of files) {
        if (!file.endsWith('.wav')) {
            files.splice(files.indexOf(file), 1);
        }
    }
    return files;
}

function makeAllPairs(files) {
    const filePairs = [];
    for (let i = 0; i < files.length; i++) {
        for (j = i; j < files.length; j++) {
            const iFirst = Math.random() >= 0.5;
            const audioFileA = files[iFirst ? i : j];
            const audioFileB = files[iFirst ? j : i];

            filePairs.push([audioFileA, audioFileB]);
        }
    }
    return filePairs;
}

function shuffleList(list) {
    const outList = list;
    for (let i = 0; i < list.length; i++) {
        swapIndex = Math.floor(Math.random() * list.length);
        const swapValue = outList[i];
        outList[i] = outList[swapIndex];
        outList[swapIndex] = swapValue;
    }
    return outList;
}

function makeTrials(files) {
    const filePairs = makeAllPairs(files);
    const shuffledPairs = shuffleList(filePairs);
    const trials = [];
    for (const pair of shuffledPairs) {
        trials.push({
            "audio_src_a": pair[0],
            "audio_src_b": pair[1]
        });
    }
    return trials;
}

function create() {
    const files = listAudioFiles();
    const spec = {
        specId: makeSpecHash(),
        practiceTrials: makePracticeTrials(),
        trials: makeTrials(files),
        files: shuffleList(files)
    };
    return spec;
}

module.exports = {create};