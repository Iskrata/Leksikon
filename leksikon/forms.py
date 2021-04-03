from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from leksikon.models import User


class RegistrationForm(FlaskForm):
    username = StringField('Име',
                           validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('Имейл',
                        validators=[DataRequired(), Email()])
    password = PasswordField('Парола', validators=[DataRequired()])
    confirm_password = PasswordField('Потвърди паролата',
                                     validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Регистрация')

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError('That username is taken. Please choose a different one.')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError('That email is taken. Please choose a different one.')


class LoginForm(FlaskForm):
    email = StringField('Имейл',
                        validators=[DataRequired(), Email()])
    password = PasswordField('Парола', validators=[DataRequired()])
    remember = BooleanField('Запомни ме')
    submit = SubmitField('Вход')   