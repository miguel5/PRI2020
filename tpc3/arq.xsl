<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="tabsite/index.html">
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
    
    <xsl:template match="ATOM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="SYMBOL"/>
                -
                <xsl:value-of select="NAME"/>
            </a>
        </li>
    </xsl:template>

    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- Templates para o conteúdo ............................................-->
    
    <xsl:template match="ATOM">
        <xsl:result-document href="tabsite/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="NAME"/></title>
                </head>
                <body>
                    <p><b>Nome</b>: <xsl:value-of select="NAME"/></p> 
                    <p><b>Peso atómico</b>: <xsl:value-of select="ATOMIC_WEIGHT"/></p>
                    <p><b>Número atómico</b>: <xsl:value-of select="ATOMIC_NUMBER"/></p> 
                    <xsl:if test="HEAT_OF_FUSION">
                        <p><b>Ponto de fusão</b>: 
                            <xsl:value-of select="HEAT_OF_FUSION"/> 
                            <xsl:value-of select="HEAT_OF_FUSION/@UNITS"/>
                        </p>
                    </xsl:if>
                    <address>[<a href="index.html#i{generate-id()}">Voltar ao índice</a>]</address>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>

    <xsl:template match="ARQELEM">
        <xsl:result-document href="tabsite/{generate-id()}.html">
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
                    <address>[<a href="index.html#i{generate-id()}">Voltar ao índice</a>]</address>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>