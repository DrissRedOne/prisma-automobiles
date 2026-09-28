#!/bin/sh
# Assemble les images rendues et la bande son en MP4.
# Usage : ./encode.sh [film|pub|pub-v]
#   film  : frames/        + out/music.wav     -> out/PRISMA-film-presentation(.mp4, -leger.mp4)
#   pub   : frames-pub/    + out/music-pub.wav -> out/PRISMA-pub-16x9(.mp4, -leger.mp4)
#   pub-v : frames-pub-v/  + out/music-pub.wav -> out/PRISMA-pub-9x16(.mp4, -leger.mp4)
# La version « haute qualité » est à envoyer aux plateformes (qui recompressent) ;
# la version « légère » sert pour WhatsApp, l'email ou un aperçu rapide.
set -e
cd "$(dirname "$0")"
FF=$(python3 -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())")
mkdir -p out
case "${1:-film}" in
  film)  FR=frames;       MU=out/music.wav;     NAME=PRISMA-film-presentation; CUT=film ;;
  pub)   FR=frames-pub;   MU=out/music-pub.wav; NAME=PRISMA-pub-16x9;          CUT=pub ;;
  pub-v) FR=frames-pub-v; MU=out/music-pub.wav; NAME=PRISMA-pub-9x16;          CUT=pub ;;
  *) echo "usage : $0 [film|pub|pub-v]"; exit 1 ;;
esac
[ -f "$MU" ] || python3 music.py "$MU" "$CUT"
COMMON="-c:v libx264 -preset slow -tune film -pix_fmt yuv420p -profile:v high -level 4.2 -color_primaries bt709 -color_trc bt709 -colorspace bt709 -movflags +faststart -shortest"
"$FF" -y -loglevel error -framerate 30 -i "$FR/f%05d.png" -i "$MU" $COMMON -crf 15 -c:a aac -b:a 320k -ar 48000 "out/$NAME.mp4"
"$FF" -y -loglevel error -framerate 30 -i "$FR/f%05d.png" -i "$MU" $COMMON -crf 21 -maxrate 9M -bufsize 18M -c:a aac -b:a 192k -ar 48000 "out/$NAME-leger.mp4"
ls -la "out/$NAME.mp4" "out/$NAME-leger.mp4"
