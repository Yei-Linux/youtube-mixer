<p align="center">
  <a href="https://www.gamiui.com">
    <img src="https://i.pinimg.com/originals/02/61/18/0261188a351ebd989dd394761403da28.jpg" alt="gamiBrain" width="200"  style="border-radius:50%"/>
    <h1 align="center">Youtube Mixer</h1>
  </a>
</p>
</br>

# Resume

- This is a site where you can download any video from youtube either mp4 or mp3 format. After that you can start using our content creator AI.

- You will need to upload a video and this video generate a transcription, then you could interact with it.

- If you want you could highlight the best part of the video and generate a short with the highlight!

# Setup

- Please run these following commands:

```console
  npm run front:dev
  npm run docker:compose-up
```

# Possible issues

- In case you have docker size issues in your device you can run this following commands to see the memory details and clear it:

```console
  docker system df -v
  docker builder prune -a
```

# Deploy to ECS aws

- Setup ecs-cli and gnupg

```console
  sudo curl -Lo /usr/local/bin/ecs-cli https://amazon-ecs-cli.s3.amazonaws.com/ecs-cli-darwin-amd64-latest
  brew install gnupg
  curl -O https://gist.githubusercontent.com/raphaelmansuy/5aab3c9e6c03e532e9dcf6c97c78b4ff/raw/f39b4df58833f09eb381700a6a854b1adfea482e/ecs-cli-signature-key.key
  gpg --import ./ecs-cli-signature-key.key
  sudo chmod +x /usr/local/bin/ecs-cli
  ecs-cli --version
```

- Then run configure.sh with following command:

```console
  npm run aws:configure-ecs
```