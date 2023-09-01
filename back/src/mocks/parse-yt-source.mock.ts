export const mock_parse_yt_source_basic_case = `var ytInitialData = {"field": { "subfield1": "test" ,"subfield2" : {"subfield1": "1", "subfield2": "2"},"subfield3" : {"subfield1": "1", "subfield2": "test"} }} text`;
export const mock_parse_yt_source_case1 = `My text: var ytInitialData = { "screen": 123 ,"playlist":{"title": "My mix", "content": [{"title": "Video1"},{"title": "Video2"}]}}, testing the rest of options`;
export const mock_parse_yt_source_case2 = `My text: var window["ytInitialData"] = { "screen": 123 ,"playlist":{"title": "My mix", "content": [{"title": "Video1"},{"title": "Video2"}]}}, testing the rest of options`;

// {{[{},{}],[]},{}}
