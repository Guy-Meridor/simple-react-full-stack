const publicApi = {}

publicApi.createQuote = (instance, text) => ({
    text,
    paragraph: instance.paragraph,
    lineIndex: instance.line_index,
    totalLineIndex: instance.total_line_index,
    key: `${instance.song_id}-${instance.total_line_index}`
});

export default publicApi;