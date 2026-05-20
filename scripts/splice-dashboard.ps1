$vuePath = Join-Path $PSScriptRoot "..\src\views\app\Dashboard.vue"
$bodyPath = Join-Path $PSScriptRoot "..\src\views\app\dashboard-body.html"
$lines = Get-Content $vuePath -Encoding UTF8
$body = Get-Content $bodyPath -Raw -Encoding UTF8

$start = -1
$end = -1
for ($i = 0; $i -lt $lines.Count; $i++) {
  if ($lines[$i] -match 'Nuevo Dashboard Design|Dashboard Moringa') { $start = $i }
}
for ($i = $start + 1; $i -lt $lines.Count; $i++) {
  if ($lines[$i] -eq '      </div>' -and $i -gt $start + 30) {
    $end = $i
    break
  }
}
if ($start -lt 0 -or $end -lt 0) { throw "markers not found start=$start end=$end" }

$newLines = @()
$newLines += $lines[0..($start - 1)]
$newLines += $body.TrimEnd().Split("`n")
$newLines += $lines[($end + 1)..($lines.Count - 1)]
$newLines | Set-Content $vuePath -Encoding UTF8
Write-Host "Spliced lines $($start + 1)-$($end + 1)"
