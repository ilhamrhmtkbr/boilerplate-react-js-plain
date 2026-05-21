import { useState, useRef, useCallback, useEffect } from 'react'

/**
 * FormImageCropper — image upload + crop field
 *
 * Props:
 *   value    — File | null (v-model equivalent)
 *   onChange — (File | null) => void
 *   label    — label teks
 *   error    — pesan error
 *
 * Usage:
 *   <FormImageCropper value={image} onChange={setImage} label="Foto Profil" error={error} />
 */

const ASPECT_PRESETS = [
  { label: 'Free',      value: null,   icon: '⊞' },
  { label: 'Square',    value: 1,      icon: '□' },
  { label: 'Landscape', value: 16 / 9, icon: '▬' },
  { label: 'Portrait',  value: 9 / 16, icon: '▮' },
  { label: '4:3',       value: 4 / 3,  icon: '⬜' },
  { label: '3:4',       value: 3 / 4,  icon: '▯' },
]

const HANDLES = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']

export default function FormImageCropper({ value, onChange, label = 'Image', error = '' }) {
  const [imgSrc, setImgSrc]               = useState(null)
  const [preview, setPreview]             = useState(null)
  const [selectedPreset, setSelectedPreset] = useState(ASPECT_PRESETS[0])
  const [crop, setCrop]                   = useState({ x: 0, y: 0, width: 0, height: 0 })
  const imgRef = useRef(null)
  const dragStart  = useRef(null)
  const resizeState = useRef(null)

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [])

  const applyCrop = useCallback((aspect) => {
    const img = imgRef.current
    if (!img) return
    const w = img.clientWidth, h = img.clientHeight
    if (!aspect) { setCrop({ x: w * 0.1, y: h * 0.1, width: w * 0.8, height: h * 0.8 }); return }
    let cw = w * 0.8, ch = cw / aspect
    if (ch > h * 0.8) { ch = h * 0.8; cw = ch * aspect }
    setCrop({ x: (w - cw) / 2, y: (h - ch) / 2, width: cw, height: ch })
  }, [])

  const onFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(null)
    const reader = new FileReader()
    reader.onload = () => setImgSrc(reader.result)
    reader.readAsDataURL(file)
  }

  const onImageLoad = () => applyCrop(selectedPreset.value)

  const handlePresetChange = (preset) => {
    setSelectedPreset(preset)
    applyCrop(preset.value)
  }

  // Drag to move
  const startDrag = (e) => {
    dragStart.current = { mx: e.clientX, my: e.clientY, cx: crop.x, cy: crop.y }
    const onMove = (ev) => {
      if (!dragStart.current || !imgRef.current) return
      const { mx, my, cx, cy } = dragStart.current
      const img = imgRef.current
      setCrop(prev => ({
        ...prev,
        x: Math.min(Math.max(cx + ev.clientX - mx, 0), img.clientWidth - prev.width),
        y: Math.min(Math.max(cy + ev.clientY - my, 0), img.clientHeight - prev.height),
      }))
    }
    const stop = () => { dragStart.current = null; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', stop) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', stop)
  }

  const startDragTouch = (e) => {
    const t = e.touches[0]
    dragStart.current = { mx: t.clientX, my: t.clientY, cx: crop.x, cy: crop.y }
    const onMove = (ev) => { ev.preventDefault(); if (!dragStart.current || !imgRef.current) return; const touch = ev.touches[0]; const { mx, my, cx, cy } = dragStart.current; const img = imgRef.current; setCrop(prev => ({ ...prev, x: Math.min(Math.max(cx + touch.clientX - mx, 0), img.clientWidth - prev.width), y: Math.min(Math.max(cy + touch.clientY - my, 0), img.clientHeight - prev.height) })) }
    const stop = () => { dragStart.current = null; window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', stop) }
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', stop)
  }

  // Resize handles
  const startResize = (handle, e) => {
    resizeState.current = { handle, mx: e.clientX, my: e.clientY, crop: { ...crop } }
    const MIN = 30
    const onMove = (ev) => {
      if (!resizeState.current || !imgRef.current) return
      const img = imgRef.current
      const { handle: h, mx, my, crop: sc } = resizeState.current
      const dx = ev.clientX - mx, dy = ev.clientY - my
      let { x, y, width, height } = sc
      const aspect = selectedPreset.value
      if (h.includes('e'))  width  = Math.max(MIN, sc.width + dx)
      if (h.includes('s'))  height = Math.max(MIN, sc.height + dy)
      if (h.includes('w')) { width = Math.max(MIN, sc.width - dx); x = sc.x + sc.width - width }
      if (h.includes('n')) { height = Math.max(MIN, sc.height - dy); y = sc.y + sc.height - height }
      if (aspect) { if (h.includes('e') || h.includes('w')) height = width / aspect; else width = height * aspect }
      x = Math.max(0, Math.min(x, img.clientWidth - MIN))
      y = Math.max(0, Math.min(y, img.clientHeight - MIN))
      width  = Math.min(width, img.clientWidth - x)
      height = Math.min(height, img.clientHeight - y)
      setCrop({ x, y, width, height })
    }
    const stop = () => { resizeState.current = null; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', stop) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', stop)
  }

  const startResizeTouch = (handle, e) => {
    const t = e.touches[0]
    resizeState.current = { handle, mx: t.clientX, my: t.clientY, crop: { ...crop } }
    const MIN = 30
    const onMove = (ev) => { ev.preventDefault(); if (!resizeState.current || !imgRef.current) return; const touch = ev.touches[0]; const img = imgRef.current; const { handle: h, mx, my, crop: sc } = resizeState.current; const dx = touch.clientX - mx, dy = touch.clientY - my; let { x, y, width, height } = sc; const aspect = selectedPreset.value; if (h.includes('e')) width = Math.max(MIN, sc.width + dx); if (h.includes('s')) height = Math.max(MIN, sc.height + dy); if (h.includes('w')) { width = Math.max(MIN, sc.width - dx); x = sc.x + sc.width - width } if (h.includes('n')) { height = Math.max(MIN, sc.height - dy); y = sc.y + sc.height - height } if (aspect) { if (h.includes('e') || h.includes('w')) height = width / aspect; else width = height * aspect } setCrop({ x: Math.max(0, Math.min(x, img.clientWidth - MIN)), y: Math.max(0, Math.min(y, img.clientHeight - MIN)), width: Math.min(width, img.clientWidth - x), height: Math.min(height, img.clientHeight - y) }) }
    const stop = () => { resizeState.current = null; window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', stop) }
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', stop)
  }

  const handleConfirm = async () => {
    const img = imgRef.current
    if (!img || !crop.width) return
    const scaleX = img.naturalWidth / img.clientWidth
    const scaleY = img.naturalHeight / img.clientHeight
    const canvas = document.createElement('canvas')
    canvas.width = crop.width * scaleX
    canvas.height = crop.height * scaleY
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, canvas.width, canvas.height)
    const blob = await new Promise((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject('Canvas empty'), 'image/jpeg', 0.9))
    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })
    setPreview(URL.createObjectURL(blob))
    setImgSrc(null)
    onChange?.(file)
  }

  const handleReset = () => {
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setImgSrc(null)
    setSelectedPreset(ASPECT_PRESETS[0])
    onChange?.(null)
  }

  const overlayStyle = { left: crop.x + 'px', top: crop.y + 'px', width: crop.width + 'px', height: crop.height + 'px' }

  return (
    <div className="grid gap-[var(--xxs)] w-full max-w-[500px]">
      <label className="capitalize font-medium text-[length:var(--s)] text-text">{label}</label>

      {preview ? (
        <div className="flex items-center gap-3">
          <img src={preview} alt="preview" className="max-w-[120px] max-h-[120px] object-cover rounded-[var(--radius-s)] border border-line" />
          <button type="button" className="text-[length:var(--s)] text-danger underline cursor-pointer bg-transparent border-none p-0" onClick={handleReset}>
            ↺ Ganti foto
          </button>
        </div>
      ) : !imgSrc ? (
        <label className={`flex flex-col items-center justify-center gap-1 border-2 border-dashed rounded-[var(--radius-s)] p-8 cursor-pointer transition-colors duration-200 ${error ? 'border-danger' : 'border-line hover:border-primary hover:bg-surface'}`}>
          <span className="text-2xl">⬆</span>
          <span className="text-[length:var(--s)] font-medium text-text">Klik untuk pilih foto</span>
          <span className="text-[length:var(--xs)] text-link italic">JPG, PNG, WEBP</span>
          <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
        </label>
      ) : (
        <div className="grid gap-2">
          {/* Aspect ratio selector */}
          <div className="flex flex-wrap gap-1">
            {ASPECT_PRESETS.map(preset => (
              <button key={preset.label} type="button"
                className={`flex items-center gap-1 px-2 py-1 text-[length:var(--xs)] rounded border cursor-pointer transition-colors duration-150 ${selectedPreset.label === preset.label ? 'bg-primary text-white border-primary' : 'border-line text-text hover:bg-surface'}`}
                onClick={() => handlePresetChange(preset)}>
                <span>{preset.icon}</span>
                <span>{preset.label}</span>
              </button>
            ))}
          </div>

          {/* Crop area */}
          <div className="relative overflow-hidden rounded-[var(--radius-s)] bg-black select-none leading-[0]">
            <img ref={imgRef} src={imgSrc} className="block max-h-[300px] w-full object-contain opacity-50" draggable="false" onLoad={onImageLoad} />
            <div className="crop-overlay" style={overlayStyle} onMouseDown={e => { e.preventDefault(); startDrag(e) }} onTouchStart={e => { e.preventDefault(); startDragTouch(e) }}>
              {HANDLES.map(handle => (
                <span key={handle} className={`crop-handle crop-handle--${handle}`}
                  onMouseDown={e => { e.preventDefault(); e.stopPropagation(); startResize(handle, e) }}
                  onTouchStart={e => { e.preventDefault(); e.stopPropagation(); startResizeTouch(handle, e) }} />
              ))}
              <span className="crop-grid" style={{ top: '33.33%', left: 0, width: '100%', height: '1px' }} />
              <span className="crop-grid" style={{ top: '66.66%', left: 0, width: '100%', height: '1px' }} />
              <span className="crop-grid" style={{ left: '33.33%', top: 0, height: '100%', width: '1px' }} />
              <span className="crop-grid" style={{ left: '66.66%', top: 0, height: '100%', width: '1px' }} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button type="button" className="flex-1 py-2 text-[length:var(--s)] font-medium rounded-[var(--radius-s)] bg-primary text-white cursor-pointer transition-opacity duration-150 hover:opacity-85 active:scale-[.97]" onClick={handleConfirm}>
              ✓ Konfirmasi
            </button>
            <button type="button" className="flex-1 py-2 text-[length:var(--s)] font-medium rounded-[var(--radius-s)] border border-line text-text bg-transparent cursor-pointer hover:bg-surface active:scale-[.97]" onClick={handleReset}>
              ✕ Batal
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-danger text-[length:var(--xs)] italic">{error}</p>}

      <style>{`
        .crop-overlay { position: absolute; border: 2px solid #fff; box-shadow: 0 0 0 9999px rgba(0,0,0,0.45); cursor: move; box-sizing: border-box; }
        .crop-grid { position: absolute; background: rgba(255,255,255,0.3); pointer-events: none; }
        .crop-handle { position: absolute; width: 10px; height: 10px; background: #fff; border: 2px solid rgba(0,0,0,0.35); border-radius: 2px; box-sizing: border-box; }
        .crop-handle--nw { top:-5px; left:-5px; cursor: nw-resize }
        .crop-handle--n  { top:-5px; left:calc(50% - 5px); cursor: n-resize }
        .crop-handle--ne { top:-5px; right:-5px; cursor: ne-resize }
        .crop-handle--e  { top:calc(50% - 5px); right:-5px; cursor: e-resize }
        .crop-handle--se { bottom:-5px; right:-5px; cursor: se-resize }
        .crop-handle--s  { bottom:-5px; left:calc(50% - 5px); cursor: s-resize }
        .crop-handle--sw { bottom:-5px; left:-5px; cursor: sw-resize }
        .crop-handle--w  { top:calc(50% - 5px); left:-5px; cursor: w-resize }
      `}</style>
    </div>
  )
}
