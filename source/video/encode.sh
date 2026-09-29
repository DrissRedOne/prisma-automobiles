#!/bin/sh
# Assemble les images rendues et la bande son en MP4.
# Usage : ./encode.sh [film|pub|pub-v]
#   film  : frames/        + out/music.wav     -> out/PRISMA-film-presentation(.mp4, -leger.mp4)
#   pub   : frames-pub/    + out/music-pub.wav -> out/PRISMA-pub-16x9(.mp4, -leger.mp4)
#   pub-v : frames-pub-v/  + out/music-pub.wav -> out/PRISMA-pub-9x16(.mp4, -leger.mp4)
# Fichiers : « -plateformes » = à envoyer à Meta, YouTube, TikTok (7,5 Mb/s) ; « -leger » = WhatsApp,
# aperçu rapide ; « -envoi » = moins de 29 Mo quand la version plateformes dépasse (film de 50 s) ;
# « .mp4 » = archive très haute qualité, seulement avec MASTER=1.
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
# archive très haute qualité (lourde) : seulement avec MASTER=1
[ "${MASTER:-0}" = 1 ] && "$FF" -y -loglevel error -framerate 30 -i "$FR/f%05d.png" -i "$MU" $COMMON -crf 15 -c:a aac -b:a 320k -ar 48000 "out/$NAME.mp4"
"$FF" -y -loglevel error -framerate 30 -i "$FR/f%05d.png" -i "$MU" $COMMON -crf 21 -maxrate 9M -bufsize 18M -c:a aac -b:a 192k -ar 48000 "out/$NAME-leger.mp4"
# version « plateformes » : 7,5 Mb/s en deux passes (débit recommandé par YouTube pour la 1080p), moins de 30 Mo pour 30 s
"$FF" -y -loglevel error -framerate 30 -i "$FR/f%05d.png" $COMMON -b:v 7500k -pass 1 -passlogfile "out/$NAME-2pass" -an -f mp4 /dev/null
"$FF" -y -loglevel error -framerate 30 -i "$FR/f%05d.png" -i "$MU" $COMMON -b:v 7500k -maxrate 12M -bufsize 16M -pass 2 -passlogfile "out/$NAME-2pass" -c:a aac -b:a 256k -ar 48000 "out/$NAME-plateformes.mp4"
rm -f "out/$NAME-2pass"*
# version « envoi » : débit calculé pour tenir sous 29 Mo (pièce jointe, messagerie), seulement si la version plateformes dépasse
N=$(ls "$FR" | grep -c 'png$'); DUR=$((N / 30))
if [ $((7756 * DUR / 8 / 1024)) -gt 29 ]; then
  VB=$(( (29 * 8 * 1024 / DUR) - 250 ))
  "$FF" -y -loglevel error -framerate 30 -i "$FR/f%05d.png" $COMMON -b:v ${VB}k -pass 1 -passlogfile "out/$NAME-2pass" -an -f mp4 /dev/null
  "$FF" -y -loglevel error -framerate 30 -i "$FR/f%05d.png" -i "$MU" $COMMON -b:v ${VB}k -maxrate 8M -bufsize 12M -pass 2 -passlogfile "out/$NAME-2pass" -c:a aac -b:a 192k -ar 48000 "out/$NAME-envoi.mp4"
  rm -f "out/$NAME-2pass"*
fi
ls -la out/$NAME*.mp4
