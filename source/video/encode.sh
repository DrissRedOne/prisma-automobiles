#!/bin/sh
# Assemble les images rendues (frames/) et la bande son (out/music.wav) en MP4.
#   out/PRISMA-film-presentation.mp4        : version haute qualité (projection, site)
#   out/PRISMA-film-presentation-leger.mp4  : version légère (WhatsApp, réseaux sociaux, email)
set -e
cd "$(dirname "$0")"
FF=$(python3 -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())")
mkdir -p out
[ -f out/music.wav ] || python3 music.py out/music.wav
"$FF" -y -loglevel error -framerate 30 -i frames/f%05d.png -i out/music.wav \
  -c:v libx264 -preset slow -crf 15 -tune film -pix_fmt yuv420p -profile:v high -level 4.2 \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 \
  -c:a aac -b:a 320k -ar 48000 -shortest -movflags +faststart out/PRISMA-film-presentation.mp4
"$FF" -y -loglevel error -framerate 30 -i frames/f%05d.png -i out/music.wav \
  -c:v libx264 -preset slow -crf 21 -maxrate 9M -bufsize 18M -tune film -pix_fmt yuv420p -profile:v high -level 4.2 \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 \
  -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart out/PRISMA-film-presentation-leger.mp4
ls -la out/*.mp4
