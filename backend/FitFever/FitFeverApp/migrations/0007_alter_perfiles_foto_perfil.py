# Generated by Django 4.2.7 on 2024-05-08 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FitFeverApp', '0006_alter_perfiles_sexo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='perfiles',
            name='foto_perfil',
            field=models.ImageField(upload_to='../static/perfil_imagenes'),
        ),
    ]
