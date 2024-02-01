import app from './server.js';

async function main() {

  const PORT = process.env.PORT || 8000

  try {

    app.listen(PORT, () => {
      console.log("Server is running on port", PORT)

    })
  } catch(error) {
    console.error(error);
    process.exit(1);
  }
}

main().catch(console.error)