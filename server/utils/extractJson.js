const extractJson = async (text) => {
    if (!text) {
        return
    }
    const cleaned = text.
         replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

        const firstBrace=cleaned.indexOf('{')
        const closeBrace=cleaned.lastIndexOf('}')
        if(firstBrace===-1 || closeBrace==-1)return null
        const jsonString=cleaned.slice(firstBrace,closeBrace+1)
    try {
        if (!jsonString) return null;
        return JSON.parse(jsonString)
    } catch (error) {
        console.error("JSON parsing error:", error.message, "\nRaw string:", jsonString);
        return null;
    }
}
export default extractJson