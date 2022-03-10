import './Auth.css'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { registerUser } from '../../../redux/actions/authentification'

const Register = ({ auth, registerUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const handleLogin = (data) => {
    registerUser(data)
  }

  return (
    <div className='login-wrapper'>
      <div className='container flex center pt-32'>
        <div className='text -align-center mb-48'>
          <h1 className=''>Enregistrez-Vous</h1>
        </div>
        <form onSubmit={handleSubmit(handleLogin)} className='stack -gap-16'>
          <div className='field'>
            <label className='field_required' htmlFor='user_firstName'>
              Prenom
            </label>
            <input
              {...register('firstName', { required: true })}
              className='input'
              autoComplete='text'
              type='text'
              id='user_firstName'
            />
            {errors.firstName && (
              <div className='form-error'>
                {errors.firstName.type === 'required' && (
                  <p id='firstName-error' class='field_error'>
                    Le prenom est requis.
                  </p>
                )}
              </div>
            )}
          </div>
          <div className='field'>
            <label className='field_required' htmlFor='user_firstName'>
              Nom
            </label>
            <input
              {...register('lastName', { required: true })}
              className='input'
              autoComplete='text'
              type='text'
              id='user_lastName'
            />
            {errors.lastName && (
              <div className='form-error'>
                {errors.lastName.type === 'required' && (
                  <p id='lastName-error' class='field_error'>
                    Le nom est requis.
                  </p>
                )}
              </div>
            )}
          </div>
          <div className='field'>
            <label className='field_required' htmlFor='user_email'>
              Adresse email
            </label>
            <input
              {...register('email', { required: true })}
              className='input'
              autoComplete='email'
              type='email'
              id='user_email'
            />
            {errors.email && (
              <div className='form-error'>
                {errors.email.type === 'required' && (
                  <p id='email-error' class='field_error'>
                    L'email est requis.
                  </p>
                )}
              </div>
            )}
          </div>
          <div className='field'>
            <label className='field_required' htmlFor='user_password'>
              Mot de passe
            </label>
            <input
              {...register('password', { minLength: 8, required: true })}
              className='input'
              autoComplete='new-password'
              aria-describedby='pw-req'
              type='password'
              id='user_password'
              aria-autocomplete='list'
            />
            {errors.password && (
              <div className='form-error'>
                {errors.password.type === 'required' && (
                  <p id='password-error' class='field_error'>
                    Le mot de passe est requis.
                  </p>
                )}
                {errors.password.type === 'minLength' && (
                  <p id='password-error-length' class='field_error'>
                    Le mot de passe doit comprendre 8 caracteres au minimum.
                  </p>
                )}
              </div>
            )}
          </div>

          {auth.error !== null && (
            <div className='mt-40'>
              <p id='email-error' class='field_error'>
                {auth.error === 'email_exist'
                  ? 'Your email address already exists, please use a new one'
                  : auth.error}
              </p>
            </div>
          )}

          {!auth.loading ? (
            <input
              type='submit'
              name='commit'
              value='Creer'
              className='button -full'
              data-disable-with='Creating account...'
            />
          ) : (
            <p>Loading...</p>
          )}
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.authentification,
})

export default connect(mapStateToProps, { registerUser })(Register)
