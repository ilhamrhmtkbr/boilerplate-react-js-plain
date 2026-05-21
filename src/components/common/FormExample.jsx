import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import FormFieldset from './FormFieldset'
import FormFloat from './FormFloat'
import FormField from './FormField'
import Button from './Button'
import CardWrapper from './CardWrapper'
import FormImageCropper from './FormImageCropper'

/**
 * FormExample — contoh pemakaian 3 form component + validasi react-hook-form + yup
 *
 * Install:
 *   npm install react-hook-form yup @hookform/resolvers
 */

const schema = yup.object({
  username: yup.string().required('Username wajib diisi').min(3, 'Minimal 3 karakter'),
  password: yup.string().required('Password wajib diisi').min(8, 'Minimal 8 karakter'),
  email:    yup.string().required('Email wajib diisi').email('Format email tidak valid'),
  image:    yup.mixed().required('Foto wajib diupload'),
  role:     yup.string().required('Role wajib dipilih'),
  gender:   yup.string().required('Gender wajib dipilih'),
  hobbies:  yup.array().min(1, 'Pilih minimal 1 hobi'),
  agree:    yup.boolean().oneOf([true], 'Harus setuju dulu'),
  resume:   yup.mixed().required('Resume wajib diupload'),
  dob:      yup.string().required('Tanggal lahir wajib diisi'),
  bio:      yup.string().required('Bio wajib diisi').max(300, 'Maksimal 300 karakter'),
})

const roleOptions    = [{ label: 'Frontend Dev', value: 'frontend' }, { label: 'Backend Dev', value: 'backend' }, { label: 'Fullstack Dev', value: 'fullstack' }]
const genderOptions  = [{ label: 'Laki-laki', value: 'male' }, { label: 'Perempuan', value: 'female' }]
const hobbyOptions   = [{ label: 'Coding', value: 'coding' }, { label: 'Gaming', value: 'gaming' }, { label: 'Reading', value: 'reading' }, { label: 'Traveling', value: 'traveling' }]

export default function FormExample() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { hobbies: [], agree: false },
  })

  const onSubmit = handleSubmit((values) => {
    console.log('Submit:', values)
  })

  return (
    <div className="grid gap-[var(--x)] p-[var(--l)]">

      {/* ── 1. Fieldset Legend style ── */}
      <CardWrapper>
        <h3 className="font-medium text-[length:var(--l)]">Login — Fieldset Style</h3>
        <Controller name="username" control={control} render={({ field }) => (
          <FormFieldset value={field.value} onChange={field.onChange} label="Username" error={errors.username?.message} />
        )} />
        <Controller name="password" control={control} render={({ field }) => (
          <FormFieldset value={field.value} onChange={field.onChange} label="Password" type="password" error={errors.password?.message} />
        )} />
        <Button text="Submit" onClick={onSubmit} />
      </CardWrapper>

      {/* ── 2. Float like Google style ── */}
      <CardWrapper>
        <h3 className="font-medium text-[length:var(--l)]">Login — Float Label Style</h3>
        <Controller name="email" control={control} render={({ field }) => (
          <FormFloat value={field.value} onChange={field.onChange} id="email" label="Email" error={errors.email?.message} />
        )} />
        <Controller name="password" control={control} render={({ field }) => (
          <FormFloat value={field.value} onChange={field.onChange} id="password" label="Password" type="password" error={errors.password?.message} />
        )} />
        <Button text="Submit" onClick={onSubmit} />
      </CardWrapper>

      {/* ── 3. Regular full-featured form ── */}
      <CardWrapper>
        <h3 className="font-medium text-[length:var(--l)]">Register — Regular Style</h3>
        <Controller name="username" control={control} render={({ field }) => (
          <FormField value={field.value} onChange={field.onChange} id="reg-username" label="Username" error={errors.username?.message} />
        )} />
        <Controller name="email" control={control} render={({ field }) => (
          <FormField value={field.value} onChange={field.onChange} id="reg-email" label="Email" type="email" error={errors.email?.message} />
        )} />
        <Controller name="password" control={control} render={({ field }) => (
          <FormField value={field.value} onChange={field.onChange} id="reg-password" label="Password" type="password" error={errors.password?.message} />
        )} />
        <Controller name="dob" control={control} render={({ field }) => (
          <FormField value={field.value} onChange={field.onChange} id="dob" label="Date of Birth" type="date" error={errors.dob?.message} />
        )} />
        <Controller name="image" control={control} render={({ field }) => (
          <FormImageCropper value={field.value} onChange={field.onChange} label="Foto Profil" error={errors.image?.message} />
        )} />
        <Controller name="role" control={control} render={({ field }) => (
          <FormField value={field.value} onChange={field.onChange} id="role" label="Role" type="select" options={roleOptions} error={errors.role?.message} />
        )} />
        <Controller name="gender" control={control} render={({ field }) => (
          <FormField value={field.value} onChange={field.onChange} id="gender" label="Gender" type="radio" options={genderOptions} error={errors.gender?.message} />
        )} />
        <Controller name="hobbies" control={control} render={({ field }) => (
          <FormField value={field.value} onChange={field.onChange} id="hobbies" label="Hobbies" type="checkbox" options={hobbyOptions} error={errors.hobbies?.message} />
        )} />
        <Controller name="agree" control={control} render={({ field }) => (
          <FormField value={field.value} onChange={field.onChange} id="agree" label="Saya setuju dengan syarat & ketentuan" type="checkbox" error={errors.agree?.message} />
        )} />
        <Controller name="resume" control={control} render={({ field }) => (
          <FormField value={field.value} onChange={field.onChange} id="resume" label="Resume" type="file" accept=".pdf,.doc,.docx" error={errors.resume?.message} />
        )} />
        <Controller name="bio" control={control} render={({ field }) => (
          <FormField value={field.value} onChange={field.onChange} id="bio" label="Bio" type="textarea" placeholder="Ceritakan tentang dirimu..." rows={4} error={errors.bio?.message} />
        )} />
        <Button text="Submit" onClick={onSubmit} />
      </CardWrapper>

    </div>
  )
}
