import cds from '@sap/cds';

 async function escape(value) {
    const escapedValue = value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    console.log("Original Value:", value);
    const encodedValue = encodeURI(value);
    console.log("Escaped Value:", encodedValue);
    return encodedValue;
}

 async function getMessage(messageClass, messageNumber, p1, p2, p3, p4) {
    let messageText = '';
    let lang = 'en';

    try {
        const query = SELECT.from('UTIL_MESSAGES')
            .columns('DESCRIPTION')
            .where({ MESSAGECLASS: messageClass, MESSAGENUMBER: messageNumber, LANGUAGE: lang });

        const result = await cds.run(query);

        if (result.length > 0) {
            messageText = result[0].DESCRIPTION;
        } else {
            const fallbackQuery = SELECT.from('UTIL_MESSAGES')
                .columns('DESCRIPTION')
                .where({ MESSAGECLASS: messageClass, MESSAGENUMBER: messageNumber, LANGUAGE: 'en' });
            const fallbackResult = await cds.run(fallbackQuery);
            if (fallbackResult.length > 0) {
                messageText = fallbackResult[0].DESCRIPTION;
            }
        }

        if (p1) messageText = messageText.replace("&1", await escape(p1.toString()));
        if (p2) messageText = messageText.replace("&2", await escape(p2.toString()));
        if (p3) messageText = messageText.replace("&3", await escape(p3.toString()));
        if (p4) messageText = messageText.replace("&4", await escape(p4.toString()));

        return messageText;
    } catch (error) {
        console.error("Error fetching message:", error);
        throw new Error("Failed to retrieve message.");
    }
}

export { escape, getMessage };