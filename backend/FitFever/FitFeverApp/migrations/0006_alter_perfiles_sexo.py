# Generated by Django 4.2.7 on 2024-05-06 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FitFeverApp', '0005_rename_id_perfil_perfiles_perfil'),
    ]

    operations = [
        migrations.AlterField(
            model_name='perfiles',
            name='sexo',
            field=models.CharField(choices=[('masculino', 'masculino'), ('femenino', 'femenino')], max_length=15),
        ),
    ]
