<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
        <head>
            <title>Информация об авторе</title>
        </head>
        <body>
            <h1>Информация об авторе</h1>
            <p>Фамилия: <xsl:value-of select="authorInfo/surname"/></p>
            <p>Имя: <xsl:value-of select="authorInfo/name"/></p>
            <p>Факультет: <xsl:value-of select="authorInfo/faculty"/></p>
            <p>Специальность: <xsl:value-of select="authorInfo/spec"/></p>
            <p>Курс: <xsl:value-of select="authorInfo/course"/></p>
            <p>Группа: <xsl:value-of select="authorInfo/group"/></p>
            <p>Тема: <xsl:value-of select="authorInfo/topic"/></p>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
