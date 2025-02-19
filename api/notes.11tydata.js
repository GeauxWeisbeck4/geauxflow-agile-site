export default function noteData () {
    return {
        permalink: "/api/notes.json"
    }
};

export default function noteEndpoint (noteData) {
    let urls = [];
    for (let key in data.collections.notes) {
        urls.push({
            url: data.collections.notes[key].filePathStem,
            description: date.collections.notes[key].data.description,
            title: data.collections.notes[key].data.title
        });
    }
    return JSON.stringify(urls);
};
