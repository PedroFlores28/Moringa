Add-Type -AssemblyName System.Drawing

$inputPath = Join-Path $PSScriptRoot "..\src\assets\img\logo\Logoto.png"
$publicDir = Join-Path $PSScriptRoot "..\public"
$size = 512
$fill = 0.92
$blackThreshold = 40

function Test-IsLogoPixel($c) {
  return ($c.R -gt $blackThreshold -or $c.G -gt $blackThreshold -or $c.B -gt $blackThreshold) -and $c.A -gt 10
}

function Convert-ToTransparentBitmap($bitmap) {
  $result = New-Object System.Drawing.Bitmap $bitmap.Width, $bitmap.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  for ($y = 0; $y -lt $bitmap.Height; $y++) {
    for ($x = 0; $x -lt $bitmap.Width; $x++) {
      $c = $bitmap.GetPixel($x, $y)
      if (Test-IsLogoPixel $c) {
        $result.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
      } else {
        $result.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
      }
    }
  }
  return $result
}

$src = [System.Drawing.Bitmap]::FromFile((Resolve-Path $inputPath))
$minX = $src.Width
$minY = $src.Height
$maxX = 0
$maxY = 0

for ($y = 0; $y -lt $src.Height; $y++) {
  for ($x = 0; $x -lt $src.Width; $x++) {
    if (Test-IsLogoPixel ($src.GetPixel($x, $y))) {
      if ($x -lt $minX) { $minX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}

$cropW = $maxX - $minX + 1
$cropH = $maxY - $minY + 1
$croppedRaw = $src.Clone([System.Drawing.Rectangle]::new($minX, $minY, $cropW, $cropH), $src.PixelFormat)
$src.Dispose()
$cropped = Convert-ToTransparentBitmap $croppedRaw
$croppedRaw.Dispose()

$inner = [int][Math]::Floor($size * $fill)
$scale = [Math]::Min($inner / $cropW, $inner / $cropH)
$drawW = [int][Math]::Round($cropW * $scale)
$drawH = [int][Math]::Round($cropH * $scale)

function Save-SquareFavicon($outPath, $outSize) {
  $bmp = New-Object System.Drawing.Bitmap $outSize, $outSize, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.Clear([System.Drawing.Color]::Transparent)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
  $dw = [int][Math]::Round($drawW * ($outSize / $size))
  $dh = [int][Math]::Round($drawH * ($outSize / $size))
  $ox = [int][Math]::Floor(($outSize - $dw) / 2)
  $oy = [int][Math]::Floor(($outSize - $dh) / 2)
  $g.DrawImage($cropped, $ox, $oy, $dw, $dh)
  $g.Dispose()
  $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

Save-SquareFavicon (Join-Path $publicDir "favicon.png") $size
Save-SquareFavicon (Join-Path $publicDir "favicon-192.png") 192
Save-SquareFavicon (Join-Path $publicDir "favicon-32.png") 32
Save-SquareFavicon (Join-Path $PSScriptRoot "..\src\assets\img\logo\Logoto.png") $size

$cropped.Dispose()
Write-Host "OK: favicon ${size}x${size} fondo transparente"
