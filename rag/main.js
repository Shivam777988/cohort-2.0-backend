import { PDFParse } from 'pdf-parse';
import fs from 'fs';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai"
let dataBuffer = fs.readFileSync('./story.pdf');
import { Pinecone } from '@pinecone-database/pinecone'
import dotenv from 'dotenv';
// import { embed } from '@pinecone-database/pinecone/dist/inference';

dotenv.config();




const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index=pc.index("cohort-2-rag")
// const parser= new PDFParse({
//     data: dataBuffer
// });
// const data = await parser.getText();
// console.log(data);

const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed"
})

// const Splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 500,
//     chunkOverlap: 0,
// });
// const chunks = await Splitter.splitText(data.text)
//  const docs = await Promise.all(chunks.map(async (chunk) => {
//     const embedding = await embeddings.embedQuery(chunk)
//     return {
//         text: chunk,
//         embedding
//     }
// }))

// const result = await index.upsert({
//     records: docs.map((doc, i) => ({
//         id: `doc-${i}`,
//         values: doc.embedding,
//         metadata: {
//             text: doc.text
//         }
//     }))
// })

const queryEmbedding = await embeddings.embedQuery("how was the internship experience?");

console.log(queryEmbedding);

const result = await index.query({
    vector: queryEmbedding,
    topK: 2,
    includeMetadata: true
})
console.log(JSON.stringify(result))
// console.log(docs);

