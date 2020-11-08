<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="arqweb/index.html">
            <html>
                <head>
                    <title>Arqueosítios do NW de Portugal</title>
                </head>
                <body>
                      <h3>Arqueosítios do NW de Portugal</h3>
                                <ul>
                                    <xsl:apply-templates mode="indice" select="//ARQELEM">
                                        <xsl:sort select="IDENTI"/>
                                    </xsl:apply-templates>
                                </ul>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    

    <!-- Templates para o índice ............................................-->

    <xsl:template match="ARQELEM" mode="indice">
        <xsl:variable name="count" select="count(preceding::ARQELEM | ancestor::ARQELEM) +1"/>
        <li>
            <a name="i{$count}"/>
            <a href="arq{$count}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>


    <!-- Templates para o conteúdo ............................................-->

    <xsl:template match="ARQELEM">
        <xsl:variable name="count" select="count(preceding::ARQELEM | ancestor::ARQELEM) +1"/>
        <xsl:result-document href="arqweb/arq{$count}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    <h2><xsl:value-of select="IDENTI"/></h2>
                    <p><b>Lugar</b>: <xsl:value-of select="LUGAR"/></p>
                    <p><b>Freguesia</b>: <xsl:value-of select="FREGUE"/></p>
                    <p><b>Concelho</b>: <xsl:value-of select="CONCEL"/></p>
                    <p><b>Latitude</b>: <xsl:value-of select="LATITU"/></p>
                    <p><b>Longitude</b>: <xsl:value-of select="LONGIT"/></p>
                    <p><b>Altitude</b>: <xsl:value-of select="ALTITU"/></p>
                    <p><b>Acesso</b>: <xsl:value-of select="ACESSO"/></p>
                    <p><b>Quadro</b>: <xsl:value-of select="QUADRO"/></p>
                    <p><b>Descrição</b>: <xsl:value-of select="DESARQ"/></p>
                    <address>[<a href="index.html#i{$count}">Voltar ao índice</a>]</address>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>