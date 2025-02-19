---
title: Creating a note
keywords: ["notes", "11ty", "geaux-flow"]
description: How to create a note in Geaux-Flow - for now
---

All notes exist under `src/notes`. You can put a note there and it will be generated into it's appropriate .html file.

Front matter
There are three different attributes for the front matter.

```
title: Title of note
keywords: ["keyword1", "keyword2"]
description: Description of the note
```

The keywords will only be used for `<meta name="keywords">`, it will not appear in the list of notes or the note.
